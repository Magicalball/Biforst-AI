// import Image from "next/image";
import Ysloading from "@/components/ysloading";

export const Loader = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <div className="relative h-10 w-10 ">
        {/* <Image
          alt="加载图片走丢了~"
          fill
          src="/loader.gif"
        /> */}
        <Ysloading />
      </div>
      <p className="text-muted-foreground text-sm">正在生成内容...</p>
    </div>
  );
};
//animate-spin