import { LandingContent } from "@/components/landingcontent";
import { LandingMain } from "@/components/landingmain";
import { LandingNav } from "@/components/landingnav";

const LandingPage = () => {
  return (
    <div>
      <LandingNav />
      <LandingMain />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
