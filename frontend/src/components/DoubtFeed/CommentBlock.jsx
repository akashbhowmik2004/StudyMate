import { FaTrashAlt } from "react-icons/fa";

const CommentBlock = ({ comment, Avatar, currentUser, onDelete }) => {
  // Check if the current logged-in user is the author of this comment
  const isMyComment = currentUser && comment.userId?._id === currentUser._id;

  return (
    <div className="group relative flex gap-4 pt-4">
      <div className="absolute -left-[27px] top-8 h-full w-px bg-white/5" />
      <Avatar
        name={comment.userId?.username}
        src={comment.userId?.profilePicture}
        size="h-8 w-8"
        className="rounded-xl ring-4 ring-[#0B0D12]"
      />
      <div className="flex-1 rounded-2xl bg-white/[0.02] p-3.5 border border-white/5 transition group-hover:border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#EDE7DA]">
            {comment.userId?.username}
          </span>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
              {comment.timestamp}
            </span>
            
            {/* Delete Button - Only renders if it's the user's comment */}
            {isMyComment && (
              <button
                onClick={onDelete}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400/60 hover:text-red-400 p-1 hover:bg-red-500/10 rounded"
                title="Delete comment"
              >
                <FaTrashAlt className="text-[11px]" />
              </button>
            )}
          </div>
        </div>
        
        <p className="mt-1.5 text-sm leading-relaxed text-[#EDE7DA]/70">
          {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentBlock;