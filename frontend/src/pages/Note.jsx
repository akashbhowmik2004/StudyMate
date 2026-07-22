import { FaBook, FaGraduationCap, FaPlus } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { api } from "../lib/axois.js";
import NoSubjectCard from "../components/Note/NoSubjectCard.jsx";
import AddNoteCard from "../components/Note/AddNoteCard.jsx";

/* -------------------------------- component ------------------------------- */

export default function Note() {
  const [subjects, setSubjects] = useState([]);

  const [subject, setSubject] = useState({ name: "" });

  // The currently clicked/selected subject. null until the user picks one.
  const [activeSubject, setActiveSubject] = useState(null);

  const fetchSubjects = async () => {
    try {
      const response = await api.get("/subjects");
      setSubjects(response.data.subjects);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch subjects");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubjectChange = (e) => {
    setSubject({
      ...subject,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      if (subject.name.trim() === "") {
        toast.error("Subject name cannot be empty");
        return;
      }
      if (
        subjects.some(
          (s) => s.name.toLowerCase() === subject.name.toLowerCase(),
        )
      ) {
        toast.error("Subject already exists");
        return;
      }
      await api.post("/subjects", {
        name: subject.name,
      });
      await fetchSubjects();
      setSubject({ name: "" });
      toast.success("Subject added successfully");
      console.log(subjects);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add subject");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#EDE7DA]">
      <StudyMateHeader />

      {/* lamp glow — cyan tint to match Navbar's cyan accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_6%,rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_92%_12%,rgba(34,211,238,0.06),transparent_32%),linear-gradient(180deg,rgba(11,13,18,1),rgba(7,8,11,1))]" />
      <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-60 h-80 w-80 rounded-full bg-cyan-300/8 blur-3xl" />

      <main className="relative flex min-h-[calc(100vh-4rem)]">
        {/* ---------------- Sidebar: subject binder ---------------- */}
        <aside className="hidden w-full max-w-xs shrink-0 flex-col border-r border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:flex sm:max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-200/20 bg-cyan-400/10 text-cyan-200">
              <FaBook className="text-sm" />
            </span>
            <h2 className="font-['Fraunces',_serif] text-xl font-medium tracking-tight text-white">
              Subjects
            </h2>
          </div>

          <form className="mt-5 space-y-3">
            <input
              type="text"
              name="name"
              onChange={handleSubjectChange}
              value={subject.name}
              placeholder="Add a subject (e.g. Physics)"
              className="w-full rounded-2xl border border-white/10 bg-[#0B0D12]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400/60 focus:bg-[#0B0D12]/80 focus:ring-2 focus:ring-cyan-400/20"
            />
            <button
              type="submit"
              onClick={handleAddSubject}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-[#0B0D12] shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)] transition hover:bg-cyan-300 active:scale-[0.99]"
            >
              <FaPlus className="text-xs" />
              Add Subject
            </button>
          </form>

          <p className="mb-2 mt-6 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Your subjects
          </p>
          <div className="flex-1 space-y-1.5 overflow-y-auto">
            {subjects.map((s) => {
              const isActive = activeSubject?.name === s.name;
              console.log(s);
              console.log(activeSubject);
              return (
                <button
                  key={s._id}
                  onClick={() => setActiveSubject(s)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition ${
                    isActive
                      ? "border-transparent bg-cyan-400 shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)]"
                      : "border-transparent bg-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`flex-1 truncate text-sm ${
                      isActive
                        ? "font-semibold text-[#0B0D12]"
                        : "text-[#EDE7DA]/75"
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
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0B0D12]/40 p-4">
            <p className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <FaGraduationCap className="text-cyan-200" />
              43 notes across {subjects.length} subjects
            </p>
          </div>
        </aside>

        {/* ---------------- Main panel ---------------- */}
        {!activeSubject ? (
          <div className="flex-2 items-center justify-center p-6 sm:flex">
            <NoSubjectCard />
          </div>
        ) : (
          <AddNoteCard activeSubject={activeSubject} />
        )}
      </main>
    </div>
  );
}
