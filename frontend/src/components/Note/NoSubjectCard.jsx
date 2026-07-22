import { FaBook } from "react-icons/fa";
const NoSubjectCard = () => {
  return (
    <div className="mx-auto flex  max-w-2xl items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
      <div className="max-w-sm">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-300/10 text-teal-200">
          <FaBook className="text-lg" />
        </span>
        <p className="font-[Fraunces,serif] text-xl font-semibold text-white">
          Select a subject
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Pick a subject from the left, or create a new one to start adding
          notes.
        </p>
      </div>
    </div>
  );
};

export default NoSubjectCard;
