"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypeWriterCompents from "typewriter-effect";
import { Button } from "@/components/ui/button";

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
      <div className="text-sm font-black text-zinc-500 md:text-xl">
        用AI提升你的工作效率，释放你的创造力！
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="rounded-full p-4 font-semibold md:p-6 md:text-lg">
            开始免费体验
          </Button>
        </Link>
      </div>
      <div className="text-xs font-normal text-zinc-400 md:text-sm">
        <p>立即注册，开启你的AI之旅！</p>
      </div>
    </div>
  );
};
