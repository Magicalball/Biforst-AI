import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { creatApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEP_API_KEY,
});

const instructionMessage: ChatCompletionMessage = {
  role: "system",
  content:
    "你是一个代码生成器这是你的身份，你必须在Markdown代码块中返回代码，并使用注释解释代码的每一行。",
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("API key is missing", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPlus = await checkSubscription();

    if (!freeTrial && !isPlus) {
      return new NextResponse("Free is required", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [instructionMessage, ...messages],
    });
    if (!isPlus) {
      await creatApiLimit();
    }
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
