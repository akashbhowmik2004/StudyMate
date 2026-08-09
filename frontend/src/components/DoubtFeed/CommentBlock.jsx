
const CommentBlock = ({ comment, Avatar }) => (
  <div className="group relative flex gap-4 pt-4">
    <div className="absolute -left-[27px] top-8 h-full w-px bg-white/5" />
    <Avatar
      name={comment.author}
      size="h-8 w-8"
      className="rounded-xl ring-4 ring-[#0B0D12]"
    />
    <div className="flex-1 rounded-2xl bg-white/[0.02] p-3.5 border border-white/5 transition group-hover:border-white/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#EDE7DA]">
          {comment.author}
        </span>
        <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
          {comment.timestamp}
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-[#EDE7DA]/70">
        {comment.text}
      </p>
    </div>
  </div>
);
export default CommentBlock
