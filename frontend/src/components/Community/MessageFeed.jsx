import { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";
import socket from "../../lib/socket.js";

const MessageFeed = ({ messages, setMessages }) => {
  const bottomRef = useRef(null);
  const handleReceiveMessage = (message) => {
    setMessages(
      (prevMessages) => {
        console.log("MessageFeed handleReceiveMessage prev:", prevMessages); // Debugging line to check the previous state
        console.log("MessageFeed handleReceiveMessage message:", message); // Debugging line to check the received message
        return [...prevMessages, message];
      }
    );
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [messages]);

  console.log("MessageFeed messages after useEffect:", messages); // Debugging line to check the messages state after useEffect

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6 sm:px-8">
      <div className="mb-5 flex justify-center">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-[#EDE7DA]/45">
          Today
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-end space-y-5">
        {messages && messages.map((msg, index) => (
          <MessageCard key={index} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessageFeed;
