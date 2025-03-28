"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ImageIcon,
  MessageSquare,
  MusicIcon,
  // VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "对话",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "图片生成",
    icon: ImageIcon,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    href: "/picture",
  },
  {
    label: "音乐生成",
    icon: MusicIcon,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: "/music",
  },
  // {
  //   label: "视频生成",
  //   icon: VideoIcon,
  //   color: "text-orange-500",
  //   bgColor: "bg-orange-500/10",
  //   href: "/video",
  // },
];

const DashboardPage = () => {
  const userouter = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-center text-2xl font-bold md:text-4xl">AI功能推荐</h2>
        <p className="text-muted-foreground text-center text-sm font-light md:text-lg">
          你好！欢迎来到Biforst
          <br />
          你可以在左侧菜单栏中，查看各个功能
          <br />
          当然，你也可以直接点击下方按钮，开始使用
          <br />
        </p>
      </div>
      <div className="space-y-4 px-4 md:px-20 lg:px-32">
        {tools.map((tool) => (
          <Card
            onClick={() => userouter.push(tool.href)} // 跳转到对应的页面
            key={tool.href}
            className="flex cursor-pointer items-center justify-between border-black/5 p-4 transition hover:shadow-md">
            <div className="flex items-center gap-x-4">
              <div className={cn("w-fit rounded-md p-2", tool.bgColor)}>
                <tool.icon className={cn("h-8 w-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-500" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
