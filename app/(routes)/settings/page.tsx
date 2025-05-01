import { Heading } from "@/components/heading";
import { PlusButton } from "@/components/plusbutton";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingsPage = async () => {
  const isPlus = await checkSubscription();

  return (
    <div>
      <Heading
        title="设置"
        description="设置页面"
        icon={Settings}
        iconColor="text-gray-400"
        bgColor="bg-gray-400/10"
      />
      <div className="space-y-4 px-4 lg:px-8">
        <div className="text-muted-foreground text-sm">
          {isPlus ? "您正在享受PLUS服务" : "您是免费用户"}
        </div>
        <PlusButton isPlus={isPlus} />
      </div>
    </div>
  );
};

export default SettingsPage;
