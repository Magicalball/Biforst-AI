import { UserButton } from "@clerk/nextjs";
import MobSidebar from "@/components/mobsidebar";
import { getApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
  const apiLimitCount = await getApiLimit();
  const isPlus = await checkSubscription();
  return (
    <div className="flex items-center p-4">
      <MobSidebar
        isPlus={isPlus}
        apiLimitCount={apiLimitCount}
      />
      <div className="flex w-full justify-end">
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
