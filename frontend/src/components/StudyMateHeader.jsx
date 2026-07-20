/**
 * StudyMate Header — self-clearing fixed header.
 *
 * Previous version used a hardcoded spacer height (h-[73px]), which was a
 * guess and turned out shorter than the header's real rendered height —
 * that's why content was still getting clipped underneath it. Fixed
 * properly now: a ResizeObserver measures the header's actual height and
 * the spacer below it matches exactly, live, so it can never drift out of
 * sync again (font loads, padding tweaks, zoom level, anything).
 *
 * Colors/logo untouched — same cyan badge as before, only the spacing
 * mechanism changed.
 */
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
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/45 backdrop-blur-2xl"
      >
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

      {/* spacer — height is measured live from the header above, so it
          can never be too short (or too tall) again */}
      <div aria-hidden="true" style={{ height: headerHeight }} />
    </>
  );
};

export default StudyMateHeader;