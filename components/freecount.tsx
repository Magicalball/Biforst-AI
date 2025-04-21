"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Max_FREE_COUNTS } from "@/constance";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps {
  apiLimitCount: number;
}

export const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="px-3">
      <Card className="p-x-4 flex items-center justify-center border-0 bg-white/10">
        <CardContent className="py-1">
          <div className="mb-4 space-y-2 text-center text-sm text-white">
            <p>
              已用额度：{apiLimitCount} per / {Max_FREE_COUNTS} per
            </p>
            <Progress
              value={(apiLimitCount / Max_FREE_COUNTS) * 100}
              className="h-2"
            />
          </div>
          <Button
            className="w-full"
            variant="premium">
            解锁PLUS版本
            <Zap className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
