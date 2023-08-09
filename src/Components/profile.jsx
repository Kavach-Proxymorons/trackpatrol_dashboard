import AuthContext from "../Contexts/AuthContext";
import { useContext } from "react";

import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users
} from "lucide-react";

import { Button } from "./ui-components/button";
import { HiCalendar } from "react-icons/hi";
import { HiEnvelope, HiChevronDown } from "react-icons/hi2";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "./ui-components/dropdown-menu";

export default function Profile() {
    const {user} = useContext(AuthContext);

    console.log(user);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-x-8 drop-shadow-md mr-6">
                    {/* <HiCalendar size={28} color="#7B7D92" />
                    <HiEnvelope size={29} color="#7B7D92" className="mr-8" /> */}
                    <Button
                        variant="outline"
                        className="flex gap-x-4 items-center h-14 rounded-lg"
                    >
                        <div className="flex flex-col items-end my-2">
                            <span className="text-base font-medium text-primary">
                                {user.name}
                            </span>
                            <span className="mt-[-2px] text-sm text-neutral-400">
                                {user.police_station}
                            </span>
                        </div>
                        {/* <div className="w-10 h-10 rounded-full bg-emerald-600"></div> */}
                    </Button>
                </div>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
}
