
import {
  FaBook,
  FaChevronDown,
  FaEllipsisH,
  FaFilePdf,
  FaGraduationCap,
  FaImage,
  FaPlus,
  FaRegStickyNote,
  FaSearch,
  FaShareAlt,
  FaThumbtack,
} from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import { useState } from "react";
import useAuth from "../context/useAuth.jsx"

/* ---------------------------------- data --------------------------------- */

const tint = {
  coral: { chip: "bg-[#F2735B]/15 text-[#FF8B72] border-[#F2735B]/30", solid: "bg-[#F2735B]", dot: "bg-[#F2735B]", ring: "border-[#F2735B]/50" },
  mint: { chip: "bg-[#6FCF97]/15 text-[#8FE0AE] border-[#6FCF97]/30", solid: "bg-[#6FCF97]", dot: "bg-[#6FCF97]", ring: "border-[#6FCF97]/50" },
  lav: { chip: "bg-[#A996D9]/15 text-[#C3B6EA] border-[#A996D9]/30", solid: "bg-[#A996D9]", dot: "bg-[#A996D9]", ring: "border-[#A996D9]/50" },
  amber: { chip: "bg-[#E8A33D]/15 text-[#F2BE6D] border-[#E8A33D]/30", solid: "bg-[#E8A33D]", dot: "bg-[#E8A33D]", ring: "border-[#E8A33D]/50" },
  sky: { chip: "bg-[#6FA8DC]/15 text-[#9BC4E8] border-[#6FA8DC]/30", solid: "bg-[#6FA8DC]", dot: "bg-[#6FA8DC]", ring: "border-[#6FA8DC]/50" },
};

const subjects = [
  { name: "Algorithms", tint: "coral", count: 12 },
  { name: "Database Systems", tint: "mint", count: 8 },
  { name: "Computer Networks", tint: "lav", count: 5 },
  { name: "Mathematics", tint: "amber", count: 15 },
  { name: "Operating Systems", tint: "sky", count: 3 },
];

const activeSubject = subjects[0];

const pinnedNotes = [
  { type: "text", title: "Big-O cheat sheet", content: "O(1) < O(log n) < O(n) < O(n log n) < O(n²) — with examples for each.", date: "3d ago" },
  { type: "pdf", title: "Sorting_Algorithms_Summary.pdf", meta: "14 pages · 2.1 MB", date: "Yesterday" },
];

const filters = [
  { label: "All", count: 6, active: true },
  { label: "Text", count: 2 },
  { label: "Images", count: 2 },
  { label: "PDFs", count: 2 },
];

const notes = [
  {
    type: "text",
    title: "Binary Search Trees — rotation rules",
    content: "Left-heavy → right rotation. Right-heavy → left rotation. Balance factor must stay within [-1, 1] after every insert.",
    date: "2h ago",
    shared: "Logic League",
  },
  {
    type: "image",
    title: "Whiteboard — Dijkstra walkthrough",
    date: "2 days ago",
  },
  {
    type: "pdf",
    title: "Practice_Set_04.pdf",
    meta: "6 pages · 860 KB",
    date: "5 days ago",
  },
  {
    type: "text",
    title: "Recursion vs. iteration — tradeoffs",
    content: "Recursion trades stack space for readability. Watch for stack overflow on deep trees without tail-call optimisation.",
    date: "6 days ago",
  },
  {
    type: "image",
    title: "Recursion tree diagram",
    date: "1 week ago",
    shared: "Logic League",
  },
  {
    type: "pdf",
    title: "Graph_Traversal_Notes.pdf",
    meta: "9 pages · 1.4 MB",
    date: "1 week ago",
  },
];

/* -------------------------------- fragments -------------------------------- */

function NoteTypeIcon({ type, className }) {
  if (type === "pdf") return <FaFilePdf className={className} />;
  if (type === "image") return <FaImage className={className} />;
  return <FaRegStickyNote className={className} />;
}

function NoteCard({note}) {
  // const { user } = useAuth();
  // //const [notes, setNotes] = useState([]);
  // const [note, setNote] = useState({
  //   userId: user.id,
  //   type: "text",
  //   title: "",
  //   content: "",

  // });


  // const handleChange = (e) => {
  //   setNote({
  //     ...note,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#EDE7DA]/12 bg-[#F3ECDD]/[0.05] p-4 transition hover:-translate-y-0.5 hover:bg-[#F3ECDD]/[0.09]">
      {/* folded corner, same detail as the Dashboard's note cards */}
      <span className="absolute right-0 top-0 h-6 w-6 -translate-y-1/2 translate-x-1/2 rotate-45 bg-[#0B0D12]" />
      <button className="absolute right-3 top-3 text-[#EDE7DA]/30 transition hover:text-[#EDE7DA]/60">
        <FaEllipsisH className="text-xs" />
      </button>

      {note.type === "image" && (
        <div className="mb-3 flex h-28 w-full items-center justify-center rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(232,163,61,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(111,207,151,0.14),transparent_50%)]">
          <FaImage className="text-2xl text-[#EDE7DA]/25" />
        </div>
      )}

      {note.type === "pdf" && (
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B0D12]/40 p-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2735B]/15 text-[#FF8B72]">
            <FaFilePdf className="text-base" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-[#EDE7DA]/85">{note.meta}</p>
            <p className="text-[11px] text-[#EDE7DA]/40">Document</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2">
        {note.type === "text" && (
          <FaRegStickyNote className="mt-0.5 shrink-0 text-xs text-[#E8A33D]/70" />
        )}
        <p className="text-sm font-semibold leading-snug text-[#F3ECDD]">{note.title}</p>
      </div>

      {note.content && (
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#EDE7DA]/55">
          {note.content}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between pt-2 text-[11px] text-[#EDE7DA]/40">
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
}

/* -------------------------------- component ------------------------------- */

export default function Note() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#EDE7DA]">
      <StudyMateHeader />

      {/* lamp glow, matches Dashboard */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_6%,rgba(232,163,61,0.14),transparent_36%),radial-gradient(circle_at_92%_12%,rgba(111,207,151,0.08),transparent_32%),linear-gradient(180deg,rgba(11,13,18,1),rgba(7,8,11,1))]" />
      <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-[#E8A33D]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-60 h-80 w-80 rounded-full bg-[#6FCF97]/8 blur-3xl" />

      <main className="relative flex min-h-[calc(100vh-4rem)]">
        {/* ---------------- Sidebar: subject binder ---------------- */}
        <aside className="hidden w-full max-w-xs shrink-0 flex-col border-r border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:flex sm:max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A33D]/15 text-[#E8A33D]">
              <FaBook className="text-sm" />
            </span>
            <h2 className="font-['Fraunces',_serif] text-xl font-medium tracking-tight text-white">
              Subjects
            </h2>
          </div>

          <form className="mt-5 space-y-3">
            <input
              type="text"
              name="subject"
              placeholder="Add a subject (e.g. Physics)"
              className="w-full rounded-2xl border border-white/10 bg-[#0B0D12]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-[#E8A33D]/60 focus:bg-[#0B0D12]/80 focus:ring-2 focus:ring-[#E8A33D]/20"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E8A33D] px-4 py-3 text-sm font-semibold text-[#0B0D12] shadow-[0_8px_24px_-8px_rgba(232,163,61,0.5)] transition hover:bg-[#F2BE6D] active:scale-[0.99]"
            >
              <FaPlus className="text-xs" />
              Add Subject
            </button>
          </form>

          <p className="mb-2 mt-6 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#EDE7DA]/40">
            Your subjects
          </p>
          <div className="flex-1 space-y-1.5 overflow-y-auto">
            {subjects.map((s) => {
              const isActive = s.name === activeSubject.name;
              return (
                <button
                  key={s.name}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition ${
                    isActive
                      ? `border-[#EDE7DA]/15 bg-[#F3ECDD]/[0.08]`
                      : "border-transparent bg-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${tint[s.tint].dot}`} />
                  <span className={`flex-1 truncate text-sm ${isActive ? "font-semibold text-white" : "text-[#EDE7DA]/75"}`}>
                    {s.name}
                  </span>
                  <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-[#EDE7DA]/45">
                    {s.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0B0D12]/40 p-4">
            <p className="inline-flex items-center gap-2 text-xs font-medium text-[#EDE7DA]/60">
              <FaGraduationCap className="text-[#E8A33D]" />
              43 notes across 5 subjects
            </p>
          </div>
        </aside>

        {/* ---------------- Main panel ---------------- */}
        <section className="flex-1 overflow-y-auto p-5 sm:p-10">
          {/* header */}
          <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] ${tint[activeSubject.tint].chip.split(" ")[1]}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${tint[activeSubject.tint].dot}`} />
                Active Subject
              </p>
              <h2 className="mt-1 font-['Fraunces',_serif] text-2xl font-medium tracking-tight text-white sm:text-3xl">
                {activeSubject.name}
              </h2>
              <p className="mt-1 text-xs text-[#EDE7DA]/45">{activeSubject.count} notes · last studied today</p>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="relative hidden sm:block">
                <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#EDE7DA]/35" />
                <input
                  type="text"
                  placeholder="Search notes"
                  className="w-48 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#EDE7DA]/35 focus:border-[#E8A33D]/50"
                />
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-[#EDE7DA]/70 transition hover:bg-white/[0.08]">
                Newest first <FaChevronDown className="text-[10px]" />
              </button>
            </div>
          </div>

          {/* review banner — the extra section that felt right here */}
          <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#E8A33D]/25 bg-[#E8A33D]/[0.07] p-4 sm:flex-row sm:items-center">
            <p className="text-sm text-[#F2BE6D]">
              <span className="font-semibold text-white">12 notes</span> in this subject are ready to revisit.
            </p>
            <button className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#E8A33D] px-4 py-2 text-xs font-semibold text-[#0B0D12] transition hover:bg-[#F2BE6D]">
              Start flashcard review
            </button>
          </div>

          {/* pinned strip */}
          <div className="mt-7">
            <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#EDE7DA]/40">
              <FaThumbtack className="text-[#E8A33D]/70" />
              Pinned
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {pinnedNotes.map((note) => (
                <div key={note.title} className="w-72 shrink-0">
                  <NoteCard note={note} />
                </div>
              ))}
            </div>
          </div>

          {/* composer, quick add */}
          <div className="mt-7 rounded-3xl border border-[#EDE7DA]/12 bg-[#F3ECDD]/[0.05] p-5">
            <div className="flex flex-wrap items-center gap-2">
              <button className="rounded-full bg-[#E8A33D] px-3.5 py-1.5 text-xs font-semibold text-[#0B0D12]">
                <FaRegStickyNote className="mr-1.5 inline text-[10px]" />
                Text
              </button>
              <button className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#EDE7DA]/70 transition hover:bg-white/10">
                <FaImage className="mr-1.5 inline text-[10px]" />
                Image
              </button>
              <button className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#EDE7DA]/70 transition hover:bg-white/10">
                <FaFilePdf className="mr-1.5 inline text-[10px]" />
                PDF
              </button>
            </div>

            <form className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Note title"
                className="w-full rounded-xl border border-white/10 bg-[#0B0D12]/50 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-[#E8A33D]/60 focus:ring-2 focus:ring-[#E8A33D]/20"
              />
              <textarea
                rows={3}
                placeholder="Write note content (optional if PDF/image is added)"
                className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0D12]/50 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-[#E8A33D]/60 focus:ring-2 focus:ring-[#E8A33D]/20"
              />
              <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]">
                  <FaImage className="text-sm text-[#6FCF97]" />
                  Attach Image/PDF
                  <input type="file" accept="image/*,application/pdf" className="hidden" />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8A33D] px-4 py-2.5 text-sm font-semibold text-[#0B0D12] shadow-[0_8px_24px_-8px_rgba(232,163,61,0.5)] transition hover:bg-[#F2BE6D] active:scale-[0.99]"
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
                key={f.label}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  f.active
                    ? "bg-white/10 text-white"
                    : "text-[#EDE7DA]/55 hover:bg-white/5 hover:text-[#EDE7DA]/80"
                }`}
              >
                {f.label}
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-[#EDE7DA]/60">
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* notes grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note.title} note={note} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}