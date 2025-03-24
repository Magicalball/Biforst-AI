import { UserButton } from "@clerk/nextjs";
import MobSidebar from "@/components/mobsidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobSidebar />
      <div className="flex w-full justify-end">
        <UserButton  afterSwitchSessionUrl="/"/> 
      </div>
    </div>
  );
};

export default Navbar;
