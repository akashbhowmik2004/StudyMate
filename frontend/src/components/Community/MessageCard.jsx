import useAuth from "../../context/useAuth.jsx";

const MessageCard = ({ message }) => {
  const { user } = useAuth();
  const isMe = message.sender === user?._id;
  const time = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="flex items-start gap-3">
      {isMe ? (
        <div className="flex w-full items-start justify-end gap-3">
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
