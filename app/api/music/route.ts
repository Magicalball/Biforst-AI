import { checkApiLimit, creatApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("未授权", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("提示词不能为空", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPlus = await checkSubscription();

    if (!freeTrial && !isPlus) {
      return new NextResponse("Free is required", { status: 403 });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      { input: { prompt_b: prompt } },
    );

    if (!isPlus) {
      await creatApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


