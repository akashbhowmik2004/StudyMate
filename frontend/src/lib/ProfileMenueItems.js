
import { FaUser,FaStickyNote } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";

export const menuItems = [
    {
        label: 'Dashboard',
        icon: MdOutlineDashboard,
        path: "/dashboard"
    },
    {
        label: 'Community',
        icon: FaUser,
        path: "/community"
    },
    {
        label: 'Notes',
        icon: FaStickyNote,
        path: "/notes"
    },
    {
        label: 'Settings',
        icon: IoIosSettings
    }
];
