import { UserButton } from "@clerk/nextjs";
import MobSidebar from "@/components/mobsidebar";
import { getApiLimit } from "@/lib/api-limit";

const Navbar = async () => {
  const apiLimitCount = await getApiLimit();
  return (
    <div className="flex items-center p-4">
      <MobSidebar apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
