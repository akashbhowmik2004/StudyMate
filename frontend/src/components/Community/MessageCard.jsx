import { Trash2 } from "lucide-react";
import useAuth from "../../context/useAuth.jsx";
import {api} from "../../lib/axois.js"
import ConfirmDialog from "../Common/ConfirmDialog.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const MessageCard = ({ message, fetchMessages, setShowConfirmDialog, showConfirmDialog }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
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
      showToast("Message deleted successfully", true);
    } catch (error) {
      console.error("Error deleting message:", error);
      showToast("Failed to delete message", false);
    }
  };

  return (
    <div className="group flex items-end gap-3 w-full">
      {showConfirmDialog && (
        <ConfirmDialog
          onConfirm={handleDeleteMessage}
          onCancel={() => setShowConfirmDialog(false)}
          title="Delete Message"
          description="Are you sure you want to delete this message?"
        />
      )}
      
      {isMe ? (
        <div className="flex w-full items-end justify-end gap-3">
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="mb-8 shrink-0 rounded-full p-2 text-slate-500 opacity-0 transition-all hover:bg-white/5 hover:text-red-400 group-hover:opacity-100"
            aria-label="Delete message"
          >
            <Trash2 size={15} />
          </button>
          
          <div className="min-w-0 max-w-[75%] text-right">
            <div className="flex items-baseline justify-end gap-2 mb-1.5 px-1">
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{time}</span>
              <span className="text-xs font-bold text-[#EDE7DA]">You</span>
            </div>
            <div className="ml-auto rounded-[1.5rem] rounded-br-sm border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 px-5 py-3.5 text-left text-sm leading-relaxed text-[#EDE7DA] shadow-lg shadow-cyan-900/10 backdrop-blur-sm">
              {message.text}
            </div>
          </div>
          
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-[10px] font-black text-[#0B0D12] shadow-md shadow-cyan-500/30">
            ME
          </span>
        </div>
      ) : (
        <div className="flex w-full items-end justify-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[11px] font-bold text-[#EDE7DA]">
            {message.username?.[0].toUpperCase()}
          </span>
          
          <div className="min-w-0 max-w-[75%] text-left">
            <div className="flex items-baseline gap-2 mb-1.5 px-1">
              <span className="text-xs font-bold text-cyan-50">
                {message.username || "Unknown"}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{time}</span>
            </div>
            <div className="rounded-[1.5rem] rounded-bl-sm border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm leading-relaxed text-[#EDE7DA]/90 backdrop-blur-sm">
              {message.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCard;