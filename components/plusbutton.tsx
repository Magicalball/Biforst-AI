"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";

interface PlusButtonProps {
  isPlus: boolean;
}

export const PlusButton = ({ isPlus = false }: PlusButtonProps) => {
  const [Loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (error) {
      console.log("Error in PlusButton:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={Loading}
      variant={isPlus ? "default" : "premium"}
      onClick={onClick}
      >
      {isPlus ? "管理PLUS页面" : "点击升级到PLUS"}
      {!isPlus && <Zap className="ml-2 h-4 w-4 fill-white" />}
    </Button>
  );
};
