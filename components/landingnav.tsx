"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNav = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="flex items-center justify-between border border-gray-200 bg-transparent p-4">
      <Link
        href="/"
        className="flex items-center">
        <div className="relative mr-4 h-8 w-16">
          <Image
            src="/logo.png"
            alt="Logo"
            fill={true}
          />
        </div>
        <span className={cn(montserrat.className, "text-xl font-bold text-black")}>Biforst-AI</span>
      </Link>
      <div className="flex items-center gap-x-2">
        {isSignedIn ? (
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="rounded-full">
              仪表盘
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/sign-in">
              <Button variant="outline">登录</Button>
            </Link>
            <Link href="/sign-up">
              <Button>注册</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
