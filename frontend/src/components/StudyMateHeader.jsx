import { FaBook } from "react-icons/fa";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import NavAuthButton from "./NavAuthButton.jsx";
import NavProfileButton from "./NavProfileButton.jsx";

const StudyMateHeader = () => {
  const { user } = useAuth();

  return (
    <header className="relative z-10 border-b border-white/10 bg-slate-950/45 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl transition hover:bg-white/10"
        >
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
        </Link>

        {user ? <NavProfileButton userInfo={user} /> : <NavAuthButton />}
      </div>
    </header>
  );
};

export default StudyMateHeader;