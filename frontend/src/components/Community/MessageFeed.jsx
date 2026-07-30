import { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";

const MessageFeed = ({ messages }) => {
  const bottomRef = useRef(null);
  console.log("MessageFeed messages:", messages); // Debugging line to check the messages prop
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6 sm:px-8">
      <div className="mb-5 flex justify-center">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-[#EDE7DA]/45">
          Today
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-end space-y-5">
        {messages.map((msg, index) => (
          <MessageCard key={index} type="me" message={msg.text} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessageFeed;