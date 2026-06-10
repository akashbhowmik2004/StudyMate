import {FaBolt, FaClock, FaComments, FaFacebook, FaTrophy, FaUsers} from "react-icons/fa";

export const Features = [
    {
        id: 0,
        title: "Ask & Answer Doubts",
        content: "Post your questions and get help from the community. Clear your doubts instantly with expert guidance.",
        icon: FaComments,
        color: { bg: "bg-indigo-50", text: "text-indigo-500" }
    },
    {
        id: 1,
        title: "Share & Access Notes",
        content: "Share your study notes with the community and access comprehensive notes from other brilliant students.",
        icon: FaFacebook,
        color: { bg: "bg-emerald-50", text: "text-emerald-500" }
    },
    {
        id: 2,
        title: "Join Communities",
        content: "Connect with students from your course, discuss topics, and build meaningful learning relationships.",
        icon: FaUsers,
        color: { bg: "bg-violet-50", text: "text-violet-500" }
    },
    {
        id: 3,
        title: "Real-time Notifications",
        content: "Get instant notifications for responses, comments, and community updates to stay connected.",
        icon:FaBolt,
        color: { bg: "bg-amber-50", text: "text-amber-500" }
    },
    {
        id: 4,
        title: "Earn Badges",
        content: "Get recognized for your contributions. Earn badges and build your academic reputation.",
        icon:FaTrophy,
        color: { bg: "bg-rose-50", text: "text-rose-500" }
    },
    {
        id: 5,
        title: "Save for Later",
        content: "Bookmark important notes, questions, and discussions to review anytime you need them.",
        icon:FaClock,
        color: { bg: "bg-cyan-50", text: "text-cyan-500" }
    }
]