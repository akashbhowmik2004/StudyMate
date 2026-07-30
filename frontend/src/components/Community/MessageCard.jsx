const MessageCard = ({ type, message }) => {
  const time = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  console.log(time);
  return (
    <div className="flex items-start gap-3">
      {type === "regular" ? (
        <>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-[#EDE7DA]">
            RS
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-white">Riya S.</span>
              <span className="text-[11px] text-[#EDE7DA]/35">{time}</span>
            </div>
            <p className="mt-1 max-w-md rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm leading-relaxed text-[#EDE7DA]/85">
              Anyone started today's problem set on graph traversal yet? Sharing
              my notes once I'm done.
            </p>
          </div>
        </>
      ) : (
        <div className="flex w-full items-start justify-end gap-3">
          <div className="min-w-0 text-right">
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-[11px] text-[#EDE7DA]/35">{time}</span>
              <span className="text-sm font-medium text-white">You</span>
            </div>
            <p className="mt-1 ml-auto max-w-md rounded-2xl rounded-tr-sm bg-cyan-400/20 px-4 py-2.5 text-left text-sm leading-relaxed text-[#EDE7DA]">
              {message}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/30 text-xs font-semibold text-cyan-200">
            Me
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
