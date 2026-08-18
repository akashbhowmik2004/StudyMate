
import { FaUser,FaStickyNote,FaRegUserCircle,FaUserFriends } from "react-icons/fa";
import { IoIosSettings,IoIosPeople } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";

export const menuItems = [
    {
        label: 'Profile',
        icon: FaRegUserCircle,
        path: "/profile"
    },
    {
        label: 'Dashboard',
        icon: MdOutlineDashboard,
        path: "/dashboard"
    },
    {
        label: 'Doubts',
        icon: FaUser,
        path: "/doubts"
    },
    {
        label: 'Friends',
        icon: FaUserFriends,
        path: "/friends"
    },
    {
        label: 'Community',
        icon: IoIosPeople,
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
