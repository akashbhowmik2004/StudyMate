import { FaPaperPlane } from "react-icons/fa";
import { api } from "../../lib/axois.js";
import socket from "../../lib/socket.js";
import { useToast } from "../../context/ToastContext.jsx";

const MessageComposer = ({
  message,
  setMessage,
  activeCommunity,
}) => {
  const { showToast } = useToast();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (message.trim() === "") {
        showToast("Message cannot be empty", false);
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
      showToast("Failed to send message", false);
    }
    setMessage("");
  };
  
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto rounded-[2rem] border border-white/10 bg-[#12141B]/90 p-2 shadow-2xl backdrop-blur-xl">
      <form className="flex items-end gap-2">
        <textarea
          rows={1}
          value={message}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          placeholder="Message the hub..."
          className="max-h-32 min-h-[52px] flex-1 resize-none bg-transparent px-5 py-4 text-sm font-medium text-[#EDE7DA] placeholder:text-[#EDE7DA]/30 outline-none no-scrollbar"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="mb-1 mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-500 text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)] transition hover:bg-cyan-400 active:scale-95 disabled:opacity-30 disabled:shadow-none"
          onClick={handleSendMessage}
        >
          <FaPaperPlane className="text-[13px] ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default MessageComposer;