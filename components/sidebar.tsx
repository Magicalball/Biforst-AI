"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { CodeIcon, ImageIcon, LayoutDashboard, MessageCircle, MusicIcon, SettingsIcon, VideoIcon } from "lucide-react";

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
    icon: MessageCircle,
    href: "/dashboard",
    color: "text-violet-500",
  },
  {
    name: "图片生成",
    icon: ImageIcon,
    href: "/dashboard",
    color: "text-pink-500",
  },
  {
    name: "视频生成",
    icon: VideoIcon,
    href: "/dashboard",
    color: "text-orange-500",
  },
  {
    name: "音乐生成",
    icon: MusicIcon,
    href: "/dashboard",
    color: "text-red-700",
  },
  {
    name: "代码生成",
    icon: CodeIcon,
    href: "/dashboard",
    color: "text-green-600",
  },
  {
    name: "设置",
    icon: SettingsIcon,
    href: "/dashboard",
    color: "text-gray-400",
  },
];

const Sidebar = () => {
  const pathaname = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 bg-[#111827] py-4 text-white">
      <div className="flex-1 px-3 py-2">
        <Link
          href="/dashboard"
          className="mb-14 flex items-center pl-3">
          <div className="relative mr-4 h-8 w-16">
            <Image
              fill={true}
              alt="Logo"
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
                pathaname === route.href ? "bg-white/10 text-white" : "text-zinc-400"
              )}>
              <div className="flex flex-1 items-center">
                <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                {route.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
// 侧边栏
