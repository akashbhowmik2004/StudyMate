import { FaPlus, FaImage, FaBook } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import NoSubjectCard from "../components/Note/NoSubjectCard.jsx";

export default function Note() {
  
  const activeSubject = null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0f16] text-slate-100 font-[Inter,sans-serif]">
      <StudyMateHeader />

      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_6%,rgba(45,212,191,0.16),transparent_36%),radial-gradient(circle_at_92%_12%,rgba(251,191,36,0.14),transparent_32%),linear-gradient(180deg,rgba(10,15,22,1),rgba(6,9,14,1))]" />
      <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-teal-300/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-60 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
      {/* faint ruled-paper texture across the whole canvas, ties back to "notes" */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 34px)",
        }}
      />

      <main className="relative flex min-h-[calc(100vh-4rem)]">
        {/* ---------------- Sidebar ---------------- */}
        <aside className="flex w-full max-w-xs shrink-0 flex-col border-r border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-300/15 text-teal-200">
              <FaBook className="text-sm" />
            </span>
            <h2 className="font-[Fraunces,serif] text-xl font-semibold tracking-tight text-white">
              Subjects
            </h2>
          </div>

          <form className="mt-5 space-y-3">
            <input
              type="text"
              placeholder="Add a subject (e.g. Physics)"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300/70 focus:bg-slate-900/80 focus:ring-2 focus:ring-teal-300/20"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_8px_24px_-8px_rgba(251,191,36,0.55)] transition hover:bg-amber-200 active:scale-[0.99]"
            >
              <FaPlus className="text-xs" />
              Add Subject
            </button>
          </form>

          <div className="mt-6 flex-1 space-y-2 overflow-y-auto">
            <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Your subjects
            </p>
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-6 text-center">
              <p className="text-sm font-medium text-slate-200">
                No subjects yet
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Add your first subject above to start creating notes.
              </p>
            </div>
          </div>
        </aside>

        {/* ---------------- Main panel ---------------- */}
        <section className="flex-1 overflow-y-auto p-6 sm:p-10">
          {!activeSubject ? (
            <NoSubjectCard/>
          ) : (
            <>
              <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-200/75">
                    Active Subject
                  </p>
                  <h2 className="mt-1 font-[Fraunces,serif] text-2xl font-semibold tracking-tight text-white">
                    {activeSubject}
                  </h2>
                </div>
              </div>

              <form className="mt-6 space-y-3 rounded-2xl border border-white/12 bg-slate-950/40 p-5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]">
                <input
                  type="text"
                  placeholder="Note title"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300/70 focus:ring-2 focus:ring-teal-300/20"
                />
                <textarea
                  rows={4}
                  placeholder="Write note content (optional if PDF/image is added)"
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300/70 focus:ring-2 focus:ring-teal-300/20"
                />

                <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]">
                    <FaImage className="text-sm text-teal-200" />
                    Attach Image/PDF
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_8px_24px_-8px_rgba(251,191,36,0.55)] transition hover:bg-amber-200 active:scale-[0.99]"
                  >
                    <FaPlus className="text-xs" />
                    Add Note
                  </button>
                </div>
              </form>

              <div className="mt-8">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Notes
                </p>
                <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
                  <p className="font-[Fraunces,serif] text-lg font-semibold text-white">
                    No notes added yet
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Add a text note, an image/PDF note, or both.
                  </p>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
