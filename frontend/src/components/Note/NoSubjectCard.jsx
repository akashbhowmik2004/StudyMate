import { FaBook } from "react-icons/fa";

const NoSubjectCard = () => {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-8 py-16 text-center backdrop-blur-sm">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_30px_-5px_rgba(34,211,238,0.2)]">
        <FaBook className="text-3xl" />
      </span>
      <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-[#EDE7DA]">
        Select a Subject
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-xs mx-auto">
        Pick a subject from the left sidebar or create a new one to start writing and organizing your notes.
      </p>
    </div>
  );
};

export default NoSubjectCard;