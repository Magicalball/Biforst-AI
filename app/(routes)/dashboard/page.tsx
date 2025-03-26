"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, MessageCircle } from "lucide-react";

const tools = [
  {
    label: "对话",
    icon: MessageCircle,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
];

const DashboardPage = () => {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-center text-2xl font-bold md:text-4xl">这里有一些东西</h2>
        <p className="text-muted-foreground text-center text-sm font-light md:text-lg">
          你好！欢迎
        </p>
      </div>
      <div className="space-y-4 px-4 md:px-20 lg:px-32">
        {tools.map((tool) => (
          <Card
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
