import { FaTrashAlt } from "react-icons/fa";
import ConfirmDialog from "../Common/ConfirmDialog.jsx";

const SubjectCard = ({
  s,
  activeSubject,
  setActiveSubject,
  setShowConfirmDialog,
  handleDeleteSubject,
  showConfirmDialog,
}) => {
  const isActive = activeSubject?.name === s.name;

  return (
    <>
      {showConfirmDialog && (
        <ConfirmDialog
          title="Delete Subject"
          description="Are you sure you want to delete this subject and all its notes?"
          onConfirm={(e) => handleDeleteSubject(e, s)}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
      <div
        key={s._id}
        role="button"
        tabIndex={0}
        onClick={() => setActiveSubject(s)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setActiveSubject(s);
          }
        }}
        className={`group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-200 border outline-none ${
          isActive
            ? "border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-transparent shadow-[inset_4px_0_0_0_rgba(34,211,238,1)]"
            : "border-transparent hover:border-white/5 hover:bg-white/[0.04]"
        }`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.85rem] text-sm font-bold transition-colors ${
            isActive
              ? "bg-cyan-500/20 text-cyan-300"
              : "bg-white/5 text-[#EDE7DA]/80 group-hover:bg-white/10 group-hover:text-white"
          }`}
        >
          {s.name[0]?.toUpperCase() || "?"}
        </span>
        
        <div className="flex-1 min-w-0">
          <span
            className={`block truncate text-sm font-bold transition-colors ${
              isActive ? "text-cyan-50" : "text-[#EDE7DA] group-hover:text-white"
            }`}
          >
            {s.name}
          </span>
          <span className="block truncate text-[11px] font-medium text-slate-500 mt-0.5">
            {s.count} {s.count === 1 ? 'note' : 'notes'}
          </span>
        </div>
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirmDialog(true);
          }}
          aria-label={`Delete ${s.name}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-500 opacity-0 transition-all hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
        >
          <FaTrashAlt className="text-[11px]" />
        </button>
      </div>
    </>
  );
};

export default SubjectCard;