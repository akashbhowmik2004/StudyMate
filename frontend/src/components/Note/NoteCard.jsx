import {
  FaEllipsisH,
  FaFilePdf,
  FaImage,
  FaRegStickyNote,
  FaShareAlt,
} from "react-icons/fa";

const NoteCard = ({ note }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.08]">
      {/* folded corner, same detail as the Dashboard's note cards */}
      <span className="absolute right-0 top-0 h-6 w-6 -translate-y-1/2 translate-x-1/2 rotate-45 bg-[#0B0D12]" />
      <button className="absolute right-3 top-3 text-[#EDE7DA]/30 transition hover:text-[#EDE7DA]/60">
        <FaEllipsisH className="text-xs" />
      </button>

      {note.type === "image" && (
        <div className="mb-3 flex h-28 w-full items-center justify-center rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(103,232,249,0.14),transparent_50%)]">
          <FaImage className="text-2xl text-[#EDE7DA]/25" />
        </div>
      )}

      {note.type === "pdf" && (
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B0D12]/40 p-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2735B]/15 text-[#FF8B72]">
            <FaFilePdf className="text-base" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-[#EDE7DA]/85">
              {note.meta}
            </p>
            <p className="text-[11px] text-slate-400">Document</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2">
        {note.type === "text" && (
          <FaRegStickyNote className="mt-0.5 shrink-0 text-xs text-cyan-200/70" />
        )}
        <p className="text-sm font-semibold leading-snug text-[#F3ECDD]">
          {note.title}
        </p>
      </div>

      {note.content && (
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#EDE7DA]/55">
          {note.content}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between pt-2 text-[11px] text-slate-400">
        <span>{note.date}</span>
        {note.shared && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[#EDE7DA]/55">
            <FaShareAlt className="text-[9px]" />
            {note.shared}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
