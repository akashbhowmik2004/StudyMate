import { FaArrowRight, FaUserSlash } from "react-icons/fa";
const DeleteProfile = () => {
  return (
        <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-300/20 to-teal-300/10 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div className="h-full rounded-[1.45rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
                  <FaUserSlash className="text-lg" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">
                  Delete Profile
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Delete your profile and all associated data.
                </p>
              </div>
            </div>
    
            <div className="mt-5 space-y-3">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Password
                </span>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Current password"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900/80"
                />
              </label>
              
            </div>
    
            <button
              type="button"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition bg-cyan-300 text-slate-900 hover:bg-cyan-200"
              
            >
              Delete Profile
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </article>
      );
}

export default DeleteProfile
