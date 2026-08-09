import { FaBook } from "react-icons/fa";
import NavAuthButton from "./NavAuthButton.jsx";
import useAuth from "../context/useAuth.jsx";
import NavProfileButton from "./NavProfileButton.jsx";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0B0D12]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo Section */}
          <a
            href="#"
            className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-cyan-400/5 text-cyan-300 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]">
              <FaBook className="text-sm" />
            </div>
            
            <div className="flex items-baseline gap-2.5">
              <span className="font-['Fraunces',_serif] text-xl font-bold tracking-tight text-[#EDE7DA]">
                StudyMate
              </span>
              <span className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-500 lg:block">
                Learn. Share. Grow.
              </span>
            </div>
          </a>

          {/* Nav Links (Pill) */}
          <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] p-1 backdrop-blur-md md:flex">
            <a
              href="#features"
              className="rounded-full px-5 py-2 text-xs font-bold text-[#EDE7DA]/70 transition-all hover:bg-white/5 hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="rounded-full px-5 py-2 text-xs font-bold text-[#EDE7DA]/70 transition-all hover:bg-white/5 hover:text-white"
            >
              How it Works
            </a>
            <a
              href="#why-us"
              className="rounded-full px-5 py-2 text-xs font-bold text-[#EDE7DA]/70 transition-all hover:bg-white/5 hover:text-white"
            >
              Why Us
            </a>
          </div>

          {/* Auth / Profile */}
          <div className="flex shrink-0 items-center gap-3">
            {user ? <NavProfileButton userInfo={user} /> : <NavAuthButton />}
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;