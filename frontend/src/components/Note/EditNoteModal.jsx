import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaImage, FaFilePdf, FaRegStickyNote } from "react-icons/fa";
import { api } from "../../lib/axois.js";
import { toast } from "react-hot-toast";
import UploadButton from "./UploadButton.jsx";

const EditNoteModal = ({ note, open, onClose, fetchNotesBySubject }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const dialogRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTitle(note?.title || "");
      setContent(note?.content || "");
    }
  }, [open, note]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => titleInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open || !note) return null;

  const handleBackdropClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/notes/${note._id}`, {
        title,
        content,
      });
      await fetchNotesBySubject();
      toast.success("Note updated successfully");
    } catch (err) {
      console.error("Failed to save note:", err);
      toast.error("Failed to save note");
    }
    onClose();
  };

  const TypeIcon =
    note.type === "image"
      ? FaImage
      : note.type === "pdf"
        ? FaFilePdf
        : FaRegStickyNote;

  return createPortal(
    <div
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D12]/80 px-4 py-8 backdrop-blur-xl transition-all"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-note-title"
        className="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#12141B] to-[#0B0D12] shadow-2xl shadow-cyan-900/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              <TypeIcon className="text-sm" />
            </span>
            <h2
              id="edit-note-title"
              className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]"
            >
              Edit Note
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-white"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-6">
          {note.type === "pdf" && (
            <div className="flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                <FaFilePdf className="text-lg" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#EDE7DA]">
                  {note.meta}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500 mt-1">PDF Document</p>
              </div>
            </div>
          )}

          {note.type === "image" && (
            <div className="flex h-32 w-full items-center justify-center rounded-2xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/10 to-transparent">
              <FaImage className="text-3xl text-fuchsia-400/50 drop-shadow-lg" />
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="note-title-input"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#EDE7DA]/50 px-1"
            >
              Title
            </label>
            <input
              id="note-title-input"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-bold text-[#EDE7DA] outline-none transition placeholder:text-[#EDE7DA]/30 focus:border-cyan-500/30 focus:bg-white/[0.04]"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="note-content-input"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#EDE7DA]/50 px-1"
            >
              Content
            </label>
            <textarea
              id="note-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Update your notes..."
              rows={5}
              className="w-full resize-none rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm leading-relaxed text-[#EDE7DA]/80 outline-none transition placeholder:text-[#EDE7DA]/30 focus:border-cyan-500/30 focus:bg-white/[0.04]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-white/5 px-6 py-5 bg-black/20">
          {note.type !== "text" && <div className="mr-auto"><UploadButton type={note.type} /></div>}
          <button
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-xs font-bold text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-[#0B0D12] shadow-[0_0_15px_-3px_rgba(34,211,238,0.4)] transition hover:bg-cyan-400"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default EditNoteModal;