import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";

// 定义请求体的类型
interface VideoGenerationRequest {
  prompt: string;
  size?: string;
  model?: string;
  duration?: number;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const {
      prompt,
      size,
      duration,
      model="wanx2.1-t2v-turbo",
    } = body as VideoGenerationRequest;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.SUNO_API_KEY) {
      return new NextResponse("API key is missing", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://apibox.erweima.ai/api/v1/generate",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.SUNO_API_KEY}`,
      },
      data: {
        prompt,
        size,
        model,
        duration,
      },
    };

    const response = await axios.request(config);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[VIDEO_GENERATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
