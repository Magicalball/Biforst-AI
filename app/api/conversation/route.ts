import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";


export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages,model } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Message is required", { status: 400 });
    }
    if (!model) {
      return new NextResponse("Model is required", { status: 400 });
    }


let openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if(model === "deepseek-chat") {
  openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.DEEP_API_KEY,
  });
}
   if (!openai.apiKey) {
    return new NextResponse("API key is missing", { status: 500 });
  }

    const response = await openai.chat.completions.create({
      model,
      messages,
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
