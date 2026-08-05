import { FaPaperPlane } from "react-icons/fa";
import { api } from "../../lib/axois.js";
import socket from "../../lib/socket.js";
import toast from "react-hot-toast";

const MessageComposer = ({
  message,
  setMessage,
  activeCommunity,
}) => {
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (message.trim() === "") {
        toast.error("Message cannot be empty");
        return;
      }
      const newMessage = await api.post("/messages", {
        text: message,
        communityId: activeCommunity._id,
      });
      console.log("New message sent:", newMessage.data);
      socket.emit("message", newMessage.data);
    } catch (err) {
      console.log(err);
    }
    setMessage("");
  };
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className="border-t border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-5">
      <form className="flex items-end gap-3">
        <textarea
          rows={1}
          value={message}
          onChange={onChange}
          placeholder="Send a message or ask a doubt to the community..."
          className="max-h-32 min-h-[46px] flex-1 resize-none rounded-2xl border border-white/10 bg-[#0B0D12]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
        />
        <button
          type="submit"
          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-cyan-400 text-[#0B0D12] shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)] transition hover:bg-cyan-300 active:scale-[0.97]"
          onClick={handleSendMessage}
        >
          <FaPaperPlane className="text-sm" />
        </button>
      </form>
    </div>
  );
};

export default MessageComposer;
