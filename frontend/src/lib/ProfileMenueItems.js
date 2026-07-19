
import { FaUser,FaStickyNote } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";

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
        label: 'Schedule',
        icon: RiCalendarScheduleFill,
        path: "/schedule"
    },
    {
        label: 'Notes',
        icon: FaStickyNote,
        path: "/notes"
    },
    {
        label: 'Settings',
        icon: IoIosSettings,
        path: "/settings"
    },
];
