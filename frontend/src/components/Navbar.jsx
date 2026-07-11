
import {FaBook} from "react-icons/fa";
import NavAuthButton from "./NavAuthButton.jsx";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          <a href="#top" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl transition hover:bg-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-400/10 text-cyan-200 shadow-inner shadow-white/5">
              <FaBook className="text-xl" />
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-semibold tracking-tight text-white">
                StudyMate
              </span>
              <span className="block text-xs text-slate-400">
                Learn. Share. Grow.
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl md:flex">
            <a
              href="#features"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              How it Works
            </a>
            <a
              href="#why-us"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Why Us
            </a>
          </div>

          <NavAuthButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
