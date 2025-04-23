"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePlusStore } from "@/hooks/use-plus";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, ImageIcon, MusicIcon, VideoIcon, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const PlusModel = () => {
  const tools = [
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
  ];
  const plusStore = usePlusStore();
  return (
    <div>
      <Dialog
        open={plusStore.isOpen}
        onOpenChange={plusStore.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
              <div className="flex items-center gap-x-2 py-1 font-bold">
                升级到 Plus 版
                <Badge
                  className="py-1 uppercase"
                  variant="premium">
                  PLUS
                </Badge>
              </div>
              <p className="text-sm text-zinc-500">体验全部AI功能，解锁全部AI工具</p>
            </DialogTitle>
            <DialogDescription className="space-y-2 pt-2 text-center font-medium text-zinc-900">
              {tools.map((tool) => (
                <Card
                  key={tool.name}
                  className="flex items-center justify-between border-black/5 p-3">
                  <div className="flex items-center gap-x-4">
                    <div className={cn("w-fit rounded-md p-2", tool.color)}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold">{tool.name}</div>
                  </div>
                  <p>不限次数 / 每日</p>
                  <Check className="text-primary h-5 w-5" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              size="lg"
              variant="premium"
              className="w-full">
              即刻体验
              <Zap className="ml-2 h-4 w-4 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
