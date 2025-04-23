"use client";

import { useEffect, useState } from "react";
import { PlusModel } from "@/components/plusmodel";

export const ModelProvider = () => {
  const [isMonted, setMonted] = useState(false);

  useEffect(() => {
    setMonted(true);
  }, []);

  if (!isMonted) {
    return null;
  }
  return (
    <>
      <PlusModel />
    </>
  );
};
