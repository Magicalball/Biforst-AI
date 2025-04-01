import Image from "next/image";

interface EmptyPageProps {
  label: string;
}

export const EmptyPage = ({ label }: EmptyPageProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <div className="relative h-72 w-72">
        <Image
          alt="图片走丢了~"
          fill
          src="/empty.png"
        />
      </div>
      <div>{label}</div>
    </div>
  );
};
