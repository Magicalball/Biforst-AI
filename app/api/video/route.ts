import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";
import Replicate from "replicate";

const replicate = new Replicate();



export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.SUNO_API_KEY) {
      return new NextResponse("API key is missing", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

  
    const response = await axios.request(config);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[MUSIC_GENERATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
