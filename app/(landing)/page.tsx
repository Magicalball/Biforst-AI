import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div>
           Landing Page (Unprotected)
           <div>
            <Link href="/sign-in">
                <Button>登录</Button>
            </Link>
            <Link href="/sign-up">
                <Button>注册</Button>
            </Link>
           </div>
        </div>
    );
}

export default LandingPage;