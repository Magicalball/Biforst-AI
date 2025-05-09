import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;
  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  try {
    console.log("Processing webhook event:", event.type);
    
    // 处理结账会话完成事件
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      console.log("Checkout session completed:", session.id);

      if (!session?.metadata?.userId) {
        return new NextResponse("User ID is required", { status: 400 });
      }

      // 获取订阅ID，可能直接在session.subscription中
      const subscriptionId = session.subscription;
      if (!subscriptionId) {
        console.error("No subscription ID found in session:", session.id);
        return new NextResponse("Subscription ID not found", { status: 400 });
      }

      console.log("Retrieving subscription:", subscriptionId);
      
      // 获取订阅详情
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const currentPeriodEnd = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 默认30天

      await prismadb.userPlus.create({
        data: {
          userId: session.metadata.userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date((subscription as any).current_period_end * 1000 || currentPeriodEnd * 1000),
        },
      });
      
      console.log("Successfully created user subscription");
    }

    // 处理发票支付成功事件
    if (event.type === "invoice.payment_succeeded") {
      // 使用any类型处理发票对象
      const invoice = event.data.object as any;
      console.log("Invoice payment succeeded:", invoice.id);
      
      // 获取发票中的订阅ID
      let subscriptionId;
      
      // 尝试从不同位置获取subscriptionId
      if (invoice.subscription) {
        subscriptionId = invoice.subscription;
      } else if (invoice.parent && invoice.parent.subscription_details && invoice.parent.subscription_details.subscription) {
        subscriptionId = invoice.parent.subscription_details.subscription;
      } else if (invoice.lines && invoice.lines.data && invoice.lines.data.length > 0) {
        const line = invoice.lines.data[0];
        if (line.parent && line.parent.subscription_item_details && line.parent.subscription_item_details.subscription) {
          subscriptionId = line.parent.subscription_item_details.subscription;
        }
      }
      
      if (!subscriptionId) {
        console.error("No subscription ID found in invoice:", invoice.id);
        return new NextResponse("Subscription ID not found in invoice", { status: 400 });
      }

      console.log("Retrieving subscription:", subscriptionId);
      
      // 获取订阅详情
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const currentPeriodEnd = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 默认30天
      
      try {
        await prismadb.userPlus.update({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          data: {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date((subscription as any).current_period_end * 1000 || currentPeriodEnd * 1000),
          },
        });
        console.log("Successfully updated user subscription");
      } catch (error) {
        console.error("Error updating user subscription:", error);
        // 尝试查找用户记录
        const userPlus = await prismadb.userPlus.findFirst({
          where: {
            stripeSubscriptionId: subscription.id,
          },
        });
        
        if (!userPlus) {
          console.log("User subscription not found, creating new record");
          // 如果记录不存在，尝试创建新记录
          if (invoice.customer) {
            await prismadb.userPlus.create({
              data: {
                userId: invoice.customer_email, // 使用客户邮箱作为临时ID
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: invoice.customer,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date((subscription as any).current_period_end * 1000 || currentPeriodEnd * 1000),
              },
            });
            console.log("Created new user subscription record");
          } else {
            return new NextResponse("Customer ID not found in invoice", { status: 400 });
          }
        }
      }
    }

    return new NextResponse(null, { status: 200 });
    
  } catch (error: unknown) {
    console.error("Webhook processing error:", error);
    return new NextResponse("Webhook processing error", { status: 500 });
  }
}
