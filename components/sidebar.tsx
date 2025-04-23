"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {FreeCounter} from "@/components/freecount";

import {
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
} from "lucide-react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    name: "仪表盘",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    name: "对话",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    name: "图片生成",
    icon: ImageIcon,
    href: "/picture",
    color: "text-pink-400",
  },
  {
    name: "视频生成",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
  },
  {
    name: "音乐生成",
    icon: MusicIcon,
    href: "/music",
    color: "text-red-700",
  },
  {
    name: "代码生成",
    icon: CodeIcon,
    href: "/code",
    color: "text-green-600",
  },
  {
    name: "设置",
    icon: SettingsIcon,
    href: "/setting",
    color: "text-gray-400",
  },
];

interface SiderbarProps {
  apiLimitCount: number;
}

const Sidebar = ({ apiLimitCount = 0 }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 bg-[#111827] py-4 text-white">
      <div className="flex-1 px-3 py-2">
        <Link
          href="/dashboard"
          className="mb-14 flex items-center pl-3">
          <div className="relative mr-4 h-8 w-16">
            <Image
              fill={true}
              alt="Logo走丢了~"
              src="/logo.png"
            />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>Biforst AI</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition-colors duration-200 hover:bg-white/10 hover:text-white",
                pathname === route.href ? "bg-white/10 text-white" : "text-zinc-400",
              )}>
              <div className="flex flex-1 items-center">
                <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                {route.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} />
      <div className="flex flex-col items-center justify-center space-y-2 border-t border-t-gray-700 pt-4">
        <p className="text-xs text-gray-400">Made by <a href="https://github.com/Magicalball/Biforst-AI" target="_blank" className="text-gray-300">Magical_ball</a></p>
        <p className="text-xs text-gray-400">© 2025 Biforst AI</p>
        <p className="text-xs text-gray-400">Powered by <a href="https://nextjs.org/" target="_blank" className="text-gray-300">Next.js</a></p>
      </div>
    </div>
  );
};

export default Sidebar;
// 侧边栏
