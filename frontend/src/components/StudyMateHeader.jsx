import { useEffect, useRef, useState } from "react";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../context/useAuth.jsx";
import NavAuthButton from "./NavAuthButton.jsx";
import NavProfileButton from "./NavProfileButton.jsx";

const StudyMateHeader = () => {
  const { user } = useAuth();
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => setHeaderHeight(el.offsetHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0B0D12]/80 backdrop-blur-xl"
      >
        {/* Reduced vertical padding here (py-2.5 instead of py-4) */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            {/* Slimmer logo box (h-8 w-8) with matching glow */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-cyan-400/5 text-cyan-300 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]">
              <FaBook className="text-sm" />
            </div>
            
            {/* Title and subtitle placed inline to save vertical space */}
            <div className="flex items-baseline gap-2.5">
              <span className="font-['Fraunces',_serif] text-xl font-bold tracking-tight text-[#EDE7DA]">
                StudyMate
              </span>
              <span className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:block">
                Learn. Share. Grow.
              </span>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-3">
            {user ? <NavProfileButton userInfo={user} /> : <NavAuthButton />}
          </div>
        </div>
      </header>

      {/* spacer — height is measured live from the header above */}
      <div aria-hidden="true" style={{ height: headerHeight }} />
    </>
  );
};

export default StudyMateHeader;