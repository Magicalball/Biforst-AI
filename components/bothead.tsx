import { Avatar, AvatarImage } from "@/components/ui/avatar";


export const BotHead = () => {
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage className="p-1" src="/bothead.jpg" />
        </Avatar>
    );
}