/**
 * StudyMate Community — matches the "desk at night" identity used across
 * Dashboard / Notes / Schedule / Settings: ink canvas, one cyan lamp
 * accent, paper-toned surfaces, Fraunces for headings.
 *
 * UI-only, same as before — no state, handlers, or data fetching, every
 * value is static placeholder content just to show the layout. Logic
 * (activeCommunity, the empty-state branch) is unchanged.
 *
 * No page-level padding needed — StudyMateHeader has a built-in spacer
 * that automatically pushes this content clear of the fixed bar.
 */
import {
  FaCircle,
  FaHashtag,
  FaPaperPlane,
  FaPlus,
  FaQuestionCircle,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";

const tint = {
  coral: { badge: "bg-[#F2735B]/15 text-[#FF8B72]", ring: "border-[#F2735B]/30 bg-[#F2735B]/10", dot: "text-[#F2735B]" },
  mint: { badge: "bg-[#6FCF97]/15 text-[#8FE0AE]", ring: "border-[#6FCF97]/30 bg-[#6FCF97]/10", dot: "text-[#6FCF97]" },
  lav: { badge: "bg-[#A996D9]/15 text-[#C3B6EA]", ring: "border-[#A996D9]/30 bg-[#A996D9]/10", dot: "text-[#A996D9]" },
  amber: { badge: "bg-[#E8A33D]/15 text-[#F2BE6D]", ring: "border-[#E8A33D]/30 bg-[#E8A33D]/10", dot: "text-[#E8A33D]" },
  sky: { badge: "bg-[#6FA8DC]/15 text-[#9BC4E8]", ring: "border-[#6FA8DC]/30 bg-[#6FA8DC]/10", dot: "text-[#6FA8DC]" },
};

export default function Community() {
  // NOTE: UI-only. No state, handlers, or data fetching — every value
  // below is static placeholder content just to show the layout.
  const activeCommunity = "DSA Study Circle";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#EDE7DA]">
      <StudyMateHeader />

      {/* lamp glow — cyan tint to match Note/Dashboard's cyan accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_6%,rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_92%_12%,rgba(34,211,238,0.06),transparent_32%),linear-gradient(180deg,rgba(11,13,18,1),rgba(7,8,11,1))]" />
      <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-60 h-80 w-80 rounded-full bg-cyan-300/8 blur-3xl" />

      <main className="relative flex min-h-[calc(100vh-4rem)]">
        {/* ---------------- Sidebar: communities ---------------- */}
        <aside className="flex w-full max-w-xs shrink-0 flex-col border-r border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-200/20 bg-cyan-400/10 text-cyan-200">
              <FaUsers className="text-sm" />
            </span>
            <h2 className="font-['Fraunces',_serif] text-xl font-medium tracking-tight text-white">
              Communities
            </h2>
          </div>

          {/* create community */}
          <form className="mt-5 space-y-3">
            <input
              type="text"
              placeholder="Create a community (e.g. NEET Aspirants)"
              className="w-full rounded-2xl border border-white/10 bg-[#0B0D12]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-cyan-400/60 focus:bg-[#0B0D12]/80 focus:ring-2 focus:ring-cyan-400/20"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-[#0B0D12] shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)] transition hover:bg-cyan-300 active:scale-[0.99]"
            >
              <FaPlus className="text-xs" />
              Create Community
            </button>
          </form>

          {/* join community */}
          <form className="mt-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Join with a code or name"
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#0B0D12]/60 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            />
            <button
              type="submit"
              className="shrink-0 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]"
            >
              Join
            </button>
          </form>

          {/* search */}
          <div className="relative mt-6">
            <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#EDE7DA]/35" />
            <input
              type="text"
              placeholder="Search your communities"
              className="w-full rounded-xl border border-white/10 bg-[#0B0D12]/40 py-2.5 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-cyan-400/60"
            />
          </div>

          {/* community list */}
          <div className="mt-4 flex-1 space-y-1.5 overflow-y-auto">
            <p className="mb-1 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#EDE7DA]/40">
              Joined
            </p>

            <button className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition ${tint.coral.ring}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${tint.coral.badge}`}>
                DS
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white">
                  DSA Study Circle
                </span>
                <span className="block truncate text-xs text-[#EDE7DA]/45">
                  128 members &middot; 6 new
                </span>
              </span>
              <FaCircle className={`text-[6px] ${tint.coral.dot}`} />
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition hover:bg-white/[0.05]">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${tint.mint.badge}`}>
                OC
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white">
                  Organic Chemistry Help
                </span>
                <span className="block truncate text-xs text-[#EDE7DA]/45">
                  64 members
                </span>
              </span>
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition hover:bg-white/[0.05]">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${tint.lav.badge}`}>
                UP
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white">
                  UPSC Prelims Batch
                </span>
                <span className="block truncate text-xs text-[#EDE7DA]/45">
                  312 members
                </span>
              </span>
            </button>

            <p className="mb-1 mt-5 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#EDE7DA]/40">
              Suggested
            </p>

            <button className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition hover:bg-white/[0.05]">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${tint.sky.badge}`}>
                PH
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white">
                  Physics Numericals
                </span>
                <span className="block truncate text-xs text-[#EDE7DA]/45">
                  89 members
                </span>
              </span>
              <span className="shrink-0 rounded-lg border border-white/15 px-2.5 py-1 text-[11px] font-medium text-[#EDE7DA]/70">
                Join
              </span>
            </button>
          </div>
        </aside>

        {/* ---------------- Main panel: community feed ---------------- */}
        <section className="flex flex-1 flex-col overflow-hidden">
          {!activeCommunity ? (
            <div className="flex h-full items-center justify-center p-10 text-center">
              <div className="max-w-sm rounded-3xl border border-dashed border-white/15 bg-[#0B0D12]/30 px-6 py-10">
                <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#EDE7DA]/50">
                  <FaUsers className="text-lg" />
                </span>
                <p className="font-['Fraunces',_serif] text-xl font-medium text-white">
                  Select a community
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#EDE7DA]/50">
                  Pick a community from the left, or create/join one to start
                  asking doubts and chatting.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* community header */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-xl sm:px-8">
                <div className="flex min-w-0 items-center gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${tint.coral.badge}`}>
                    DS
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate font-['Fraunces',_serif] text-lg font-medium text-white">
                      {activeCommunity}
                    </h2>
                    <p className="flex items-center gap-1 truncate text-xs text-[#EDE7DA]/45">
                      <FaHashtag className="text-[10px]" />
                      general &middot; 128 members &middot; 14 online
                    </p>
                  </div>
                </div>
                <button className="hidden shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-white/[0.1] sm:inline-flex">
                  <FaUsers className="text-xs" />
                  Members
                </button>
              </div>

              {/* messages / doubts feed */}
              <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
                <div className="flex justify-center">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-[#EDE7DA]/45">
                    Today
                  </span>
                </div>

                {/* regular message */}
                <div className="flex items-start gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${tint.amber.badge}`}>
                    RS
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-white">
                        Riya S.
                      </span>
                      <span className="text-[11px] text-[#EDE7DA]/35">
                        9:14 AM
                      </span>
                    </div>
                    <p className="mt-1 max-w-md rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm leading-relaxed text-[#EDE7DA]/85">
                      Anyone started today's problem set on graph traversal
                      yet? Sharing my notes once I'm done.
                    </p>
                  </div>
                </div>

                {/* doubt message */}
                <div className="flex items-start gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${tint.mint.badge}`}>
                    AK
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-white">
                        Arjun K.
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-cyan-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-200">
                        <FaQuestionCircle className="text-[9px]" />
                        Doubt
                      </span>
                      <span className="text-[11px] text-[#EDE7DA]/35">
                        9:26 AM
                      </span>
                    </div>
                    <p className="mt-1 max-w-md rounded-2xl rounded-tl-sm border border-cyan-400/25 bg-cyan-400/[0.06] px-4 py-2.5 text-sm leading-relaxed text-[#EDE7DA]/85">
                      Why does BFS use a queue instead of a stack for shortest
                      path in an unweighted graph? Still confused on the
                      intuition.
                    </p>
                    <button className="mt-1.5 text-xs font-medium text-cyan-200 hover:text-cyan-100">
                      3 replies
                    </button>
                  </div>
                </div>

                {/* own message, right aligned */}
                <div className="flex items-start justify-end gap-3">
                  <div className="min-w-0 text-right">
                    <div className="flex items-baseline justify-end gap-2">
                      <span className="text-[11px] text-[#EDE7DA]/35">
                        9:31 AM
                      </span>
                      <span className="text-sm font-medium text-white">
                        You
                      </span>
                    </div>
                    <p className="mt-1 ml-auto max-w-md rounded-2xl rounded-tr-sm bg-cyan-400/20 px-4 py-2.5 text-left text-sm leading-relaxed text-[#EDE7DA]">
                      Because BFS explores level by level, a queue keeps
                      earlier (shorter-path) nodes ahead of later ones.
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/30 text-xs font-semibold text-cyan-200">
                    Me
                  </span>
                </div>
              </div>

              {/* composer */}
              <div className="border-t border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-5">
                <div className="mb-2 flex items-center gap-2">
                  <button className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                    Message
                  </button>
                  <button className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-[#EDE7DA]/70 hover:bg-white/[0.06]">
                    <FaQuestionCircle className="text-[10px]" />
                    Ask a Doubt
                  </button>
                </div>
                <form className="flex items-end gap-3">
                  <textarea
                    rows={1}
                    placeholder="Send a message or ask a doubt to the community..."
                    className="max-h-32 min-h-[46px] flex-1 resize-none rounded-2xl border border-white/10 bg-[#0B0D12]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <button
                    type="submit"
                    className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-cyan-400 text-[#0B0D12] shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)] transition hover:bg-cyan-300 active:scale-[0.97]"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </form>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}