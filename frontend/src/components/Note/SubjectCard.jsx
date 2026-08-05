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
  console.log(s);
  console.log(activeSubject);
  return (
    <>
      {showConfirmDialog && (
        <ConfirmDialog
          title="Delete Subject"
          description="Are you sure you want to delete this subject?"
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
        className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition ${
          isActive
            ? "border-transparent bg-cyan-400 shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)]"
            : "border-transparent bg-transparent hover:bg-white/[0.04]"
        }`}
      >
        <span
          className={`flex-1 truncate text-sm ${
            isActive ? "font-semibold text-[#0B0D12]" : "text-[#EDE7DA]/75"
          }`}
        >
          {s.name}
        </span>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
            isActive
              ? "bg-[#0B0D12]/15 text-[#0B0D12]"
              : "bg-white/5 text-slate-400"
          }`}
        >
          {s.count}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirmDialog(true);
          }}
          aria-label={`Delete ${s.name}`}
          className={`shrink-0 rounded-lg p-1.5 transition ${
            isActive
              ? "text-[#0B0D12]/60 hover:bg-[#0B0D12]/10 hover:text-[#0B0D12]"
              : "text-slate-500 hover:bg-white/5 hover:text-red-400"
          }`}
        >
          <FaTrashAlt className="text-xs" />
        </button>
      </div>
    </>
  );
};

export default SubjectCard;
