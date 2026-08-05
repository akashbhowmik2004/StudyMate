import { Trash2 } from "lucide-react";
import useAuth from "../../context/useAuth.jsx";
import toast from "react-hot-toast";
import {api} from "../../lib/axois.js"
import ConfirmDialog from "../Common/ConfirmDialog.jsx";

const MessageCard = ({ message, fetchMessages, setShowConfirmDialog, showConfirmDialog }) => {
  const { user } = useAuth();
  console.log("messages", message);
  const isMe = message.sender === user?._id;
  const time = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const activeCommunityId = message.community;

  const handleDeleteMessage = async () => {
    try {
      console.log("Deleting message with ID:", message._id);
      await api.delete(`/messages/${message._id}`);
      await fetchMessages(activeCommunityId);
      setShowConfirmDialog(false);
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="group flex items-start gap-3">
      {showConfirmDialog && (
        <ConfirmDialog
          onConfirm={handleDeleteMessage}
          onCancel={() => setShowConfirmDialog(false)}
          title="Delete Message"
          description="Are you sure you want to delete this message?"
        />
      )}
      {isMe ? (
        <div className="flex w-full items-start justify-end gap-3">
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="mt-6 shrink-0 rounded-full p-1.5 text-[#EDE7DA]/0 opacity-0 transition-all hover:bg-white/10 hover:text-red-400 group-hover:text-[#EDE7DA]/40 group-hover:opacity-100"
            aria-label="Delete message"
          >
            <Trash2 size={14} />
          </button>
          <div className="min-w-0 text-right">
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-[11px] text-[#EDE7DA]/35">{time}</span>
              <span className="text-sm font-medium text-white">You</span>
            </div>
            <p className="mt-1 ml-auto max-w-md rounded-2xl rounded-tr-sm bg-cyan-400/20 px-4 py-2.5 text-left text-sm leading-relaxed text-[#EDE7DA]">
              {message.text}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/30 text-xs font-semibold text-cyan-200">
            Me
          </span>
        </div>
      ) : (
        <>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-[#EDE7DA]">
            {message.username?.[0].toUpperCase()}
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-white">
                {message.username || "Unknown User"}
              </span>
              <span className="text-[11px] text-[#EDE7DA]/35">{time}</span>
            </div>
            <p className="mt-1 max-w-md rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm leading-relaxed text-[#EDE7DA]/85">
              {message.text}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageCard;