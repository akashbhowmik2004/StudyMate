import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaImage, FaFilePdf, FaRegStickyNote } from "react-icons/fa";
import { api } from "../../lib/axois.js";
import { toast } from "react-hot-toast";
import UploadButton from "./UploadButton.jsx";
/**
 * EditNoteModal
 *
 * Props:
 *  - note: { id, type: "text" | "image" | "pdf", title, content, meta, date, shared }
 *  - open: boolean
 *  - onClose: () => void
 *  - fetchNotesBySubject: () => void
 */
const EditNoteModal = ({ note, open, onClose, fetchNotesBySubject }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const dialogRef = useRef(null);
  const titleInputRef = useRef(null);

  // Reset local state whenever a new note is opened
  useEffect(() => {
    if (open) {
      setTitle(note?.title || "");
      setContent(note?.content || "");
    }
  }, [open, note]);

  // Autofocus title field on open
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => titleInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
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
    // Here you would typically call an API to save the changes
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

  // Portalled to document.body so the modal isn't trapped inside any
  // ancestor card's `transform` (e.g. the NoteCard's hover:-translate-y-0.5),
  // which would otherwise turn `position: fixed` into a local containing
  // block and cause the modal to jump/glitch when a card is hovered.
  return createPortal(
    <div
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-note-title"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12141B] shadow-2xl shadow-black/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-200/80">
              <TypeIcon className="text-[13px]" />
            </span>
            <h2
              id="edit-note-title"
              className="text-sm font-semibold text-[#F3ECDD]"
            >
              Edit note
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-[#EDE7DA]/40 transition hover:bg-white/5 hover:text-[#EDE7DA]/80"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-5 py-5">
          {note.type === "pdf" && (
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B0D12]/40 p-3">
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

          {note.type === "image" && (
            <div className="flex h-24 w-full items-center justify-center rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(103,232,249,0.14),transparent_50%)]">
              <FaImage className="text-xl text-[#EDE7DA]/25" />
            </div>
          )}

          <div>
            <label
              htmlFor="note-title-input"
              className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-[#EDE7DA]/40"
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
              className="w-full rounded-xl border border-white/10 bg-[#0B0D12]/60 px-3 py-2.5 text-sm text-[#F3ECDD] placeholder:text-[#EDE7DA]/25 outline-none transition focus:border-cyan-300/40 focus:ring-1 focus:ring-cyan-300/30"
            />
          </div>

          <div>
            <label
              htmlFor="note-content-input"
              className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-[#EDE7DA]/40"
            >
              Content
            </label>
            <textarea
              id="note-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write something..."
              rows={5}
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0D12]/60 px-3 py-2.5 text-sm leading-relaxed text-[#EDE7DA]/85 placeholder:text-[#EDE7DA]/25 outline-none transition focus:border-cyan-300/40 focus:ring-1 focus:ring-cyan-300/30"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-white/10 px-5 py-4">
          {note.type !== "text" && <UploadButton type={note.type} />}
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-[#EDE7DA]/70 transition hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-cyan-300/90 px-4 py-2 text-xs font-semibold text-[#0B0D12] transition hover:bg-cyan-200"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default EditNoteModal;
