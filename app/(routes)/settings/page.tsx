import { Heading } from "@/components/heading";
import { Settings } from "lucide-react";

const SettingsPage = () => {
    return (
        <div>
            <Heading
            title="设置"
            description="设置页面"
            icon={Settings}
            iconColor="text-gray-400"
            bgColor="bg-gray-400/10"
            />
        </div>
    )
}

export default SettingsPage;