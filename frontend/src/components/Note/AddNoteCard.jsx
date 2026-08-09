import {
  FaFilePdf,
  FaImage,
  FaPlus,
  FaRegStickyNote,
  FaSearch,
  FaTimes, // Added FaTimes
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../lib/axois.js";
import NoteCard from "./NoteCard.jsx";
import UploadButton from "./UploadButton.jsx";

const filters = [
  { label: "All", value: "all" },
  { label: "Text", value: "text" },
  { label: "Images", value: "image" },
  { label: "PDFs", value: "pdf" },
];

const AddNoteCard = ({
  activeSubject,
  fetchSubjects,
  setShowConfirmDialog,
  showConfirmDialog,
}) => {
  const [notes, setNotes] = useState([]);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [note, setNote] = useState({
    title: "",
    content: "",
    type: "text",
    subjectId: "",
  });
  const [activeButton, setActiveButton] = useState("text");
  const [filter, setFilter] = useState("all");

  const [counts, setCounts] = useState({
    all: 0,
    text: 0,
    image: 0,
    pdf: 0,
  });

  const fetchNotesBySubject = async () => {
    if (!activeSubject) {
      setNotes([]);
      return;
    }
    try {
      const response = await api.get("/notes", {
        params: {
          subjectId: activeSubject._id,
          type: filter,
        },
      });
      if (!response.data.notes) {
        setNotes([]);
        return;
      }
      console.log(response.data);
      console.log(note.type);
      setNotes(response.data.notes);
      setCounts(response.data.counts);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotesBySubject();
  }, [activeSubject, filter]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", note.title);
    formData.append("content", note.content);
    formData.append("type", note.type);
    formData.append("subjectId", activeSubject ? activeSubject._id : null);
    try {
      if (file) {
        formData.append("file", file);
      }
      console.log(file);
      await api.post("/notes", formData);
      await fetchNotesBySubject();
      setFile(null);
      setErrors({});
      setActiveButton("text");
      await fetchSubjects();
      toast.success("Note added successfully");
      setNote({
        title: "",
        content: "",
        type: "text",
        subjectId: activeSubject ? activeSubject._id : null,
      });
    } catch (err) {
      console.log(err);
      setErrors({
        [err.response.data.field]: err.response.data.message,
        ErrorCode: err.response.status,
      });
    }
  };

  const onNoteChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-10 no-scrollbar relative z-10 w-full max-w-6xl mx-auto">
      {/* header */}
      <div className="flex flex-col gap-5 border-b border-white/5 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
            Active Subject
          </p>
          <h2 className="mt-2 font-['Fraunces',_serif] text-4xl font-black tracking-tight text-[#EDE7DA]">
            {activeSubject ? activeSubject.name : "No subject selected"}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#EDE7DA]/30" />
            <input
              type="text"
              placeholder="Search notes"
              className="w-56 rounded-xl border border-white/5 bg-white/[0.02] py-2.5 pl-10 pr-4 text-sm font-medium text-[#EDE7DA] outline-none transition placeholder:text-[#EDE7DA]/30 focus:border-cyan-500/30 focus:bg-white/[0.04]"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-[#EDE7DA]/80 transition hover:bg-white/10 hover:text-white">
            Search
          </button>
        </div>
      </div>

      {/* composer, quick add */}
      <div className="group relative mt-8 overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 shadow-2xl transition-all hover:border-white/10">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setNote({ ...note, type: "text" });
              setActiveButton("text");
            }}
            className={`flex items-center rounded-full border px-4 py-2 text-xs font-bold transition-all ${
              activeButton === "text"
                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                : "border-white/10 bg-white/5 text-[#EDE7DA]/60 hover:bg-white/10 hover:text-[#EDE7DA]"
            }`}
          >
            <FaRegStickyNote className="mr-2 text-[13px]" />
            Text Note
          </button>
          <button
            onClick={() => {
              setNote({ ...note, type: "image" });
              setActiveButton("image");
            }}
            className={`flex items-center rounded-full border px-4 py-2 text-xs font-bold transition-all ${
              activeButton === "image"
                ? "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400"
                : "border-white/10 bg-white/5 text-[#EDE7DA]/60 hover:bg-white/10 hover:text-[#EDE7DA]"
            }`}
          >
            <FaImage className="mr-2 text-[13px]" />
            Image Note
          </button>
          <button
            onClick={() => {
              setNote({ ...note, type: "pdf" });
              setActiveButton("pdf");
            }}
            className={`flex items-center rounded-full border px-4 py-2 text-xs font-bold transition-all ${
              activeButton === "pdf"
                ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                : "border-white/10 bg-white/5 text-[#EDE7DA]/60 hover:bg-white/10 hover:text-[#EDE7DA]"
            }`}
          >
            <FaFilePdf className="mr-2 text-[13px]" />
            PDF Doc
          </button>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={handleAddNote}
          encType="multipart/form-data"
        >
          
          {/* Separated Title Field */}
          <div>
            {errors.title && (
              <p className="mb-1.5 text-xs font-bold text-red-400">{errors.title}</p>
            )}
            <div className={`rounded-2xl border px-5 py-4 transition-all duration-300 ${
              errors.title 
                ? "border-red-500/50 bg-red-500/5" 
                : "border-white/5 bg-white/[0.02] focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
            }`}>
              <input
                type="text"
                name="title"
                onChange={onNoteChange}
                value={note.title}
                placeholder="What's this note about?"
                className="w-full bg-transparent font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA] outline-none placeholder:text-[#EDE7DA]/30"
              />
            </div>
          </div>
          
          {/* Separated Content Field */}
          <div>
            {errors.content && (
              <p className="mb-1.5 text-xs font-bold text-red-400">{errors.content}</p>
            )}
            <div className={`rounded-2xl border px-5 py-4 transition-all duration-300 ${
              errors.content 
                ? "border-red-500/50 bg-red-500/5" 
                : "border-white/5 bg-white/[0.02] focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
            }`}>
              <textarea
                name="content"
                onChange={onNoteChange}
                value={note.content}
                placeholder="Add details, context, or summaries (optional for files)..."
                rows={2}
                className="w-full resize-none bg-transparent text-sm leading-relaxed text-[#EDE7DA]/80 outline-none placeholder:text-[#EDE7DA]/25"
              />
            </div>
          </div>

          {/* File Preview Pill */}
          {file && (
            <div className={`flex items-center justify-between rounded-xl border px-4 py-3 backdrop-blur-md transition-all ${
              note.type === "image" 
                ? "border-fuchsia-500/30 bg-fuchsia-500/10" 
                : "border-amber-500/30 bg-amber-500/10"
            }`}>
              <div className="flex items-center gap-3 min-w-0">
                {note.type === "image" ? (
                  <FaImage className="text-fuchsia-400 shrink-0 text-sm" />
                ) : (
                  <FaFilePdf className="text-amber-400 shrink-0 text-sm" />
                )}
                <span className={`text-xs font-bold truncate ${
                  note.type === "image" ? "text-fuchsia-200" : "text-amber-200"
                }`}>
                  {file.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="ml-3 shrink-0 rounded-full bg-white/10 p-1.5 text-white transition hover:bg-white/20 hover:text-red-300"
              >
                <FaTimes className="text-[10px]" />
              </button>
            </div>
          )}
          
          {/* Actions Footer */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              {note.type === "image" && (
                <UploadButton type="image" setFile={setFile} />
              )}
              {note.type === "pdf" && (
                <UploadButton type="pdf" setFile={setFile} />
              )}
            </div>
            
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)] transition hover:bg-cyan-400 hover:shadow-cyan-400/40 active:scale-95"
            >
              <FaPlus className="text-[11px]" />
              Save Note
            </button>
          </div>
        </form>
      </div>

      {/* filter chips */}
      <div className="mt-10 flex flex-wrap items-center gap-3 border-b border-white/5 pb-5">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              console.log(f.value);
              setFilter(f.value);
            }}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold transition-all ${
              filter === f.value
                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                : "border-transparent bg-white/5 text-[#EDE7DA]/60 hover:bg-white/10 hover:text-[#EDE7DA]"
            }`}
          >
            {f.label}
            <span className={`rounded-full px-2 py-0.5 text-[10px] ${filter === f.value ? "bg-cyan-500/20 text-cyan-200" : "bg-black/30 text-slate-400"}`}>
              {counts[f.value] > 0 ? counts[f.value] : 0}
            </span>
          </button>
        ))}
      </div>

      {/* notes grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start pb-20">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              fetchNotesBySubject={fetchNotesBySubject}
              fetchSubjects={fetchSubjects}
              setShowConfirmDialog={setShowConfirmDialog}
              showConfirmDialog={showConfirmDialog}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
             <p className="text-sm font-medium text-slate-500 italic">No notes found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNoteCard;