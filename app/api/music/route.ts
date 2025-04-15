import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";

// 定义请求体的类型
interface MusicGenerationRequest {
  prompt: string;
  style?: string;
  title?: string;
  customMode?: boolean;
  instrumental?: boolean;
  model?: string;
  negativeTags?: string;
  callBackUrl: string;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const {
      prompt,
      style,
      title,
      customMode = false,
      instrumental = false,
      model,
      negativeTags,
      callBackUrl,
    } = body as MusicGenerationRequest;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.SUNO_API_KEY) {
      return new NextResponse("API key is missing", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!callBackUrl) {
      return new NextResponse("CallBackUrl is required", { status: 400 });
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
        style,
        title,
        customMode,
        instrumental,
        model,
        negativeTags,
        callBackUrl,
      },
    };

    const response = await axios.request(config);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[MUSIC_GENERATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
