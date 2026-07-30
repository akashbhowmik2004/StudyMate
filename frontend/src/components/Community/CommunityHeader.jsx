import { useEffect, useRef, useState } from "react";
import {
  FaHashtag,
  FaUsers,
  FaEllipsisV,
  FaKey,
  FaBell,
  FaSignOutAlt,
  FaCopy,
} from "react-icons/fa";

import toast from "react-hot-toast";

const CommunityHeader = ({ activeCommunity, onLeave }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        console.log(activeCommunity);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!");
        console.log("Copied to clipboard:", text);
      },
      (err) => {
        toast.error("Failed to copy text!");
        console.error("Failed to copy text: ", err);
      },
    );
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-xl sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center bg-[#EDE7DA]/15 text-white justify-center rounded-xl text-sm font-semibold`}
        >
          {activeCommunity?.name[0].toUpperCase()}
        </span>
        <div className="min-w-0">
          <h2 className="truncate font-['Fraunces',_serif] text-lg font-medium text-white">
            {activeCommunity?.name}
          </h2>
          <p className="flex items-center gap-1 truncate text-xs text-[#EDE7DA]/45">
            <FaHashtag className="text-[10px]" />
            general &middot; {activeCommunity?.members?.length || 0} members
            &middot; 14 online
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button className="hidden shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-white/[0.1] sm:inline-flex">
          <FaUsers className="text-xs" />
          Members
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition hover:bg-white/[0.1]"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <FaEllipsisV className="text-xs" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#141414]/95 shadow-xl backdrop-blur-xl">
              <button
                onClick={() => {
                  copyToClipboard(activeCommunity?.uniqueCode);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[#EDE7DA]/85 transition hover:bg-white/[0.06]"
              >
                <FaKey className="text-xs text-[#EDE7DA]/50" />
                {activeCommunity?.uniqueCode}
                <FaCopy className="inline-block text-xs text-[#EDE7DA]/50" />
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[#EDE7DA]/85 transition hover:bg-white/[0.06]"
              >
                <FaBell className="text-xs text-[#EDE7DA]/50" />
                Notification settings
              </button>

              <div className="my-1 h-px bg-white/10" />

              <button
                onClick={() => {
                  onLeave?.();
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <FaSignOutAlt className="text-xs" />
                Leave community
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
