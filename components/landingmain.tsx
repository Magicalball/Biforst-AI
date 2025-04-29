"use client";
import { useAuth } from "@clerk/nextjs";
import TypeWriterCompents from "typewriter-effect";

export const LandingMain = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="space-y-5 py-36 text-center font-bold text-black">
      <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>探索你的AI工具</h1>
      </div>
      <div className="space-y-5 bg-clip-text text-4xl font-normal text-gray-600">
        <TypeWriterCompents
          options={{
            strings: ["AI助手", "AI音乐生成", "AI代码生成", "AI图像生成", "AI视频生成"],
            autoStart: true,
            loop: true,
            delay: 50,
          }}
        />
      </div>
    </div>
  );
};
