import { useState, useRef, useEffect } from "react";
import {
  FaEllipsisH,
  FaFilePdf,
  FaRegStickyNote,
  FaShareAlt,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { api } from "../../lib/axois.js";
import { toast } from "react-hot-toast";
import EditNoteModal from "./EditNoteModal.jsx";
import ConfirmDialog from "../Common/ConfirmDialog.jsx";

const NoteCard = ({
  note,
  fetchNotesBySubject,
  fetchSubjects,
  setShowConfirmDialog,
  showConfirmDialog,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEdit = () => {
    setIsEditing(true);
    setMenuOpen(false);
  };

  const handleDeleteNote = async () => {
    try {
      await api.delete(`/notes/${note._id}`);
      await fetchNotesBySubject();
      await fetchSubjects();
      setShowConfirmDialog(false);
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      {showConfirmDialog && (
        <ConfirmDialog
          title="Confirm Delete"
          description="Are you sure you want to delete this note?"
          onConfirm={handleDeleteNote}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
      <div
        className={`group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.08] ${
          menuOpen ? "z-30" : "z-0"
        }`}
      >
        {/* folded corner clipped in its own layer, so it no longer clips the dropdown */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <span className="absolute right-0 top-0 h-6 w-6 -translate-y-1/2 translate-x-1/2 rotate-45 bg-[#0B0D12]" />
        </span>

        <div className="absolute right-3 top-3" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-[#EDE7DA]/30 transition hover:text-[#EDE7DA]/60"
          >
            <FaEllipsisH className="text-xs" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-5 z-20 w-32 overflow-hidden rounded-xl border border-white/10 bg-[#12141B] shadow-lg shadow-black/40">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit();
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#EDE7DA]/80 transition hover:bg-white/5"
              >
                <FaEdit className="text-[11px] text-cyan-200/70" />
                Edit
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  // handle share
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#EDE7DA]/80 transition hover:bg-white/5"
              >
                <FaShareAlt className="text-[10px] text-cyan-200/70" />
                Share
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowConfirmDialog(true);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#FF8B72] transition hover:bg-white/5"
              >
                <FaTrashAlt className="text-[11px]" />
                Delete
              </button>
            </div>
          )}
        </div>

        {isEditing && (
          <EditNoteModal
            note={note}
            open={isEditing}
            onClose={() => setIsEditing(false)}
            fetchNotesBySubject={fetchNotesBySubject}
          />
        )}

        {note.type === "image" && (
          <a
            href={`http://localhost:3000/uploads/${note.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`http://localhost:3000/uploads/${note.fileUrl}`}
              alt="image"
              className="mb-3 h-40 w-full rounded-xl border border-white/10 object-cover"
            />
          </a>
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
            <a
              href={`http://localhost:3000/uploads/${note.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-cyan-400 transition hover:underline"
            >
              <p className="text-[12px] text-cyan-400 transition hover:underline">
                open
              </p>
            </a>
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
    </>
  );
};

export default NoteCard;
