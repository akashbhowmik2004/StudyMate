import { FaBook, FaGraduationCap, FaPlus } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { api } from "../lib/axois.js";
import NoSubjectCard from "../components/Note/NoSubjectCard.jsx";
import AddNoteCard from "../components/Note/AddNoteCard.jsx";
import SubjectCard from "../components/Note/SubjectCard.jsx";

export default function Note() {
  const [subjects, setSubjects] = useState([]);
  const [noteCount, setNoteCount] = useState(0);
  const [subject, setSubject] = useState({ name: "" });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [activeSubject, setActiveSubject] = useState(null);

  const fetchSubjects = async () => {
    try {
      const response = await api.get("/subjects");
      if (!response) {
        setSubjects([]);
        return;
      }
      setNoteCount(response.data.totalNotes);
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

  const handleDeleteSubject = async (e, s) => {
    e.stopPropagation();
    try {
      await api.delete(`/subjects/${s._id}`);
      if (activeSubject?._id === s._id) {
        setActiveSubject(null);
      }
      await fetchSubjects();
      setActiveSubject(null);
      setShowConfirmDialog(false);
      toast.success("Subject deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete subject");
    }
  };

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#0B0D12] text-[#EDE7DA] selection:bg-cyan-500/30">
      <div className="flex-none relative z-50">
        <StudyMateHeader />
      </div>

      {/* Modern Ambient Backglow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-[20%] w-[1000px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-[100%]" />
        <div className="absolute bottom-0 right-[10%] w-[800px] h-[600px] bg-fuchsia-500/5 blur-[150px] rounded-[100%]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <main className="relative z-10 flex min-h-0 flex-1 overflow-hidden">
        {/* ---------------- Sidebar: subject binder ---------------- */}
        <aside className="hidden w-full max-w-[320px] shrink-0 flex-col border-r border-white/5 bg-gradient-to-b from-[#0B0D12]/95 to-[#0B0D12]/80 p-6 backdrop-blur-2xl sm:flex transition-transform overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/5 border border-cyan-500/20 text-cyan-300 shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)]">
              <FaBook className="text-lg" />
            </span>
            <h2 className="font-['Fraunces',_serif] text-2xl font-bold tracking-tight text-[#EDE7DA]">
              Subjects
            </h2>
          </div>

          <form className="group relative mt-6" onSubmit={handleAddSubject}>
            <div className="absolute -inset-0.5 rounded-[1.25rem] bg-gradient-to-r from-cyan-500/30 to-fuchsia-500/30 opacity-0 blur transition duration-500 group-focus-within:opacity-100" />
            <div className="relative flex flex-col space-y-3 rounded-2xl bg-[#0B0D12] p-3 border border-white/5">
              <input
                type="text"
                name="name"
                onChange={handleSubjectChange}
                value={subject.name}
                placeholder="New subject..."
                className="w-full rounded-xl bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[#EDE7DA] outline-none transition placeholder:text-[#EDE7DA]/30 focus:bg-white/[0.06]"
              />
              <button
                type="submit"
                onClick={handleAddSubject}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] transition hover:bg-cyan-400 active:scale-[0.98]"
              >
                <FaPlus className="text-xs" />
                Add Subject
              </button>
            </div>
          </form>

          <p className="mb-3 mt-8 px-1 text-xs font-bold uppercase tracking-widest text-[#EDE7DA]/40">
            Your subjects
          </p>
          <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar pb-4">
            {subjects.length > 0 ? (
              subjects.map((s) => (
                <SubjectCard
                  key={s._id}
                  s={s}
                  activeSubject={activeSubject}
                  setActiveSubject={setActiveSubject}
                  setShowConfirmDialog={setShowConfirmDialog}
                  showConfirmDialog={showConfirmDialog}
                  handleDeleteSubject={handleDeleteSubject}
                />
              ))
            ) : (
              <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
                <p className="text-xs font-medium text-[#EDE7DA]/30">No subjects yet</p>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 shadow-lg backdrop-blur-sm">
            <p className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
              <FaGraduationCap className="text-cyan-400 text-sm" />
              {noteCount} notes • {subjects.length} subjects
            </p>
          </div>
        </aside>

        {/* ---------------- Main panel ---------------- */}
        <section className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
          {!activeSubject ? (
            <div className="flex h-full items-center justify-center p-6">
              <NoSubjectCard />
            </div>
          ) : (
            <AddNoteCard
              activeSubject={activeSubject}
              fetchSubjects={fetchSubjects}
              setShowConfirmDialog={setShowConfirmDialog}
              showConfirmDialog={showConfirmDialog}
            />
          )}
        </section>
      </main>
    </div>
  );
}