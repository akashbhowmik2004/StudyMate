import { useState, useRef, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { api } from "../../lib/axois.js";
import { useToast } from "../../context/ToastContext.jsx";
const DoubtComposer = ({ setDoubts, fetchAllDoubts }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [doubtInput, setDoubtInput] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({});
  // Added state for doubt input
  const [file, setFile] = useState(null); // Added file state
  const composerRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        composerRef.current &&
        !composerRef.current.contains(e.target) &&
        !doubtInput.title &&
        !doubtInput.content &&
        !file
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [doubtInput.title, doubtInput.content, file]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setDoubtInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePost = async () => {
    if (!doubtInput.title.trim()) return;
    try {
      const response = await api.post("/doubts", {
        title: doubtInput.title.trim(),
        content: doubtInput.content.trim(),
      });
      setDoubts((prev) => [response.data.newDoubt, ...prev]);
      fetchAllDoubts(); // Refresh the doubts list
      console.log("Doubt posted successfully:", response.data.newDoubt);
      showToast("Doubt posted successfully!");
      setDoubtInput({ title: "", content: "" });
      setErrors({});
      setFile(null); // Reset file
      setIsExpanded(false);
    } catch (err) {
      console.log(err);
      if (err.response) {
        setErrors({
          [err.response.data.field]: err.response.data.message,
          ErrorCode: err.response.status,
        });
      }
      showToast("Error posting doubt.", false);
    }
  };

  return (
    <div
      ref={composerRef}
      className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 ease-in-out ${
        isExpanded
          ? "border-cyan-400/30 bg-gradient-to-br from-[#0B0D12] to-cyan-900/10 shadow-[0_0_40px_-10px_rgba(34,211,238,0.15)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-transparent opacity-50" />

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 w-full min-w-0">
            {!isExpanded ? (
              <div className="mt-2.5">
                <input
                  onFocus={() => setIsExpanded(true)}
                  placeholder="What are you stuck on today?"
                  className="w-full cursor-text bg-transparent text-lg font-medium text-[#EDE7DA] placeholder:text-[#EDE7DA]/40 outline-none"
                />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-top-2 space-y-4 w-full">
                {/* Title Field */}
                {errors.title && (
                  <p className="mt-1.5 px-1 text-xs font-bold text-red-400">
                    {errors.title}
                  </p>
                )}
                <div
                  className={
                    errors.title
                      ? "rounded-2xl border border-red-500/50 bg-red-500/5 px-5 py-4"
                      : "rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-all duration-300 focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
                  }
                >
                  <input
                    autoFocus
                    value={doubtInput.title}
                    name="title"
                    onChange={onChange}
                    placeholder="Summarize your doubt..."
                    className="w-full bg-transparent font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA] placeholder:text-[#EDE7DA]/30 outline-none"
                  />
                </div>

                {/*  Content Field */}
                {errors.content && (
                  <p className="mt-1.5 px-1 text-xs font-bold text-red-400">
                    {errors.content}
                  </p>
                )}
                <div
                  className={
                    errors.content
                      ? "rounded-2xl border border-red-500/50 bg-red-500/5 px-5 py-4"
                      : "rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-all duration-300 focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
                  }
                >
                  <textarea
                    value={doubtInput.content}
                    name="content"
                    onChange={onChange}
                    placeholder="Provide more context, paste code snippets, or share what you've tried..."
                    rows={3}
                    className="w-full resize-none bg-transparent text-sm leading-relaxed text-[#EDE7DA]/80 placeholder:text-[#EDE7DA]/25 outline-none"
                  />
                </div>

                {/* Image Preview Pill */}
                {file && (
                  <div className="flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 backdrop-blur-md">
                    <div className="flex items-center gap-2 min-w-0">
                      <FaImage className="text-cyan-400 shrink-0" />
                      <span className="text-xs font-bold text-cyan-200 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="ml-3 shrink-0 rounded-full bg-white/10 p-1 text-cyan-200 hover:bg-white/20 hover:text-white transition"
                    >
                      <FaTimes className="text-[10px]" />
                    </button>
                  </div>
                )}

                {/* Actions Footer */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/5 pt-5 mt-2">
                  <div className="flex items-center gap-4">
                    {/* Attach Image Button */}
                    <label className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#EDE7DA]/80 transition-all hover:bg-white/10 hover:text-white">
                      <FaImage className="text-cyan-400/80 text-[13px]" />
                      <span>Attach Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>

                    <span className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:block">
                      Markdown supported
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setIsExpanded(false);
                        setFile(null); // Clear file on cancel
                      }}
                      className="flex-1 sm:flex-none rounded-xl px-5 py-2.5 text-xs font-bold text-[#EDE7DA]/50 transition hover:bg-white/5 hover:text-[#EDE7DA]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePost}
                      disabled={!doubtInput.title.trim()}
                      className="flex-1 sm:flex-none rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)] transition hover:bg-cyan-400 hover:shadow-cyan-400/40 disabled:opacity-50 disabled:shadow-none active:scale-95"
                    >
                      Post Doubt
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtComposer;
