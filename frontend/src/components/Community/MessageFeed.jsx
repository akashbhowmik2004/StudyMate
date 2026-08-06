import { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";
import socket from "../../lib/socket.js";

const MessageFeed = ({
  messages,
  setMessages,
  fetchMessages,
  setShowConfirmDialog,
  showConfirmDialog,
}) => {
  const bottomRef = useRef(null);

  const handleReceiveMessage = (message) => {
    setMessages((prevMessages) => {
      console.log("MessageFeed handleReceiveMessage prev:", prevMessages);
      console.log("MessageFeed handleReceiveMessage message:", message);
      return [...prevMessages, message];
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [messages]);

  console.log("MessageFeed messages after useEffect:", messages);

  return (
    // h-full instead of flex-1: the parent wrapper in Community.jsx is a plain
    // div (not flex), so flex-1 was a no-op there — the list had no height cap
    // and just grew with content, which is why overflow-y-auto never scrolled.
    <div className="flex h-full min-h-0 flex-col overflow-y-auto px-4 py-6 sm:px-8 max-w-5xl mx-auto w-full no-scrollbar">
      <div className="mb-8 flex justify-center">
        <span className="rounded-full border border-white/5 bg-white/[0.02] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#EDE7DA]/50 backdrop-blur-sm">
          Start of conversation
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-end space-y-6">
        {messages &&
          messages.map((msg, index) => (
            <MessageCard
              key={index}
              message={msg}
              fetchMessages={fetchMessages}
              setShowConfirmDialog={setShowConfirmDialog}
              showConfirmDialog={showConfirmDialog}
            />
          ))}
        <div ref={bottomRef} className="h-2" />
      </div>
    </div>
  );
};

export default MessageFeed;