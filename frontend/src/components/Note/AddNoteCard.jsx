import {
  FaFilePdf,
  FaImage,
  FaPlus,
  FaRegStickyNote,
  FaSearch,
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

const AddNoteCard = ({ activeSubject, fetchSubjects }) => {
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
    <section className="flex-1 overflow-y-auto p-5 sm:p-10">
      {/* header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
            Active Subject
          </p>
          <h2 className="mt-1 font-['Fraunces',_serif] text-2xl font-medium tracking-tight text-white sm:text-3xl">
            {activeSubject ? activeSubject.name : "No subject selected"}
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative hidden sm:block">
            <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
            <input
              type="text"
              placeholder="Search notes"
              className="w-48 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/50"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-[#EDE7DA]/70 transition hover:bg-white/[0.08]">
            Search 
          </button>
        </div>
      </div>

      {/* composer, quick add */}
      <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setNote({ ...note, type: "text" });
              setActiveButton("text");
            }}
            className={`rounded-full ${activeButton === "text" ? "bg-cyan-400" : "bg-white/10"} px-3.5 py-1.5 text-xs font-semibold text-[#0B0D12]`}
          >
            <FaRegStickyNote className="mr-1.5 inline text-[10px]" />
            Text
          </button>
          <button
            onClick={() => {
              setNote({ ...note, type: "image" });
              setActiveButton("image");
            }}
            className={`rounded-full ${activeButton === "image" ? "bg-cyan-400" : "bg-white/10"} px-3.5 py-1.5 text-xs font-semibold text-[#0B0D12]`}
          >
            <FaImage className="mr-1.5 inline text-[10px]" />
            Image
          </button>
          <button
            onClick={() => {
              setNote({ ...note, type: "pdf" });
              setActiveButton("pdf");
            }}
            className={`rounded-full ${activeButton === "pdf" ? "bg-cyan-400" : "bg-white/10"} px-3.5 py-1.5 text-xs font-semibold text-[#0B0D12]`}
          >
            <FaFilePdf className="mr-1.5 inline text-[10px]" />
            PDF
          </button>
        </div>

        <form
          className="mt-4 space-y-3"
          onSubmit={handleAddNote}
          encType="multipart/form-data"
        >
          {errors.title && (
            <p className="text-xs font-medium text-red-400">{errors.title}</p>
          )}
          <input
            type="text"
            name="title"
            onChange={onNoteChange}
            value={note.title}
            placeholder="Note title"
            className={`w-full rounded-xl border border-white/10 bg-[#0B0D12]/50 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400/60 focus:ring-2${
              errors.title
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "placeholder:text-slate-400 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            }`}
          />
          {errors.content && (
            <p className="text-xs font-medium text-red-400">{errors.content}</p>
          )}
          <textarea
            name="content"
            onChange={onNoteChange}
            value={note.content}
            placeholder="Write note content (optional if PDF/image is added)"
            className={`w-full resize-none rounded-xl border border-white/10 bg-[#0B0D12]/50 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20${
              errors.content
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "placeholder:text-slate-400 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            }`}
          />
          <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            {note.type === "image" && (
              <UploadButton type="image" setFile={setFile} />
            )}
            {note.type === "pdf" && (
              <UploadButton type="pdf" setFile={setFile} />
            )}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-[#0B0D12] shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)] transition hover:bg-cyan-300 active:scale-[0.99]"
            >
              <FaPlus className="text-xs" />
              Add Note
            </button>
          </div>
        </form>
      </div>

      {/* filter chips */}
      <div className="mt-8 flex items-center gap-2 border-b border-white/10 pb-5">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              console.log(f.value);
              setFilter(f.value);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              filter === f.value
                ? "bg-white/10 text-white"
                : "text-[#EDE7DA]/55 hover:bg-white/5 hover:text-[#EDE7DA]/80"
            }`}
          >
            {f.label}
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-[#EDE7DA]/60">
              {counts[f.value] > 0 ? counts[f.value] : 0}
            </span>
          </button>
        ))}
      </div>

      {/* notes grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            fetchNotesBySubject={fetchNotesBySubject}
            fetchSubjects={fetchSubjects}
          />
        ))}
      </div>
    </section>
  );
};

export default AddNoteCard;
