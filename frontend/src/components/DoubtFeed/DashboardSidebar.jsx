import { useState, useEffect } from "react";
import { FaTrophy, FaFire } from "react-icons/fa";
import useAuth from "../../context/useAuth.jsx";
import { Link } from "react-router";
import { api } from "../../lib/axois.js";

const DashboardSidebar = ({ Avatar }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ streak: 0, rank: "Top 5%" });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard");
        if (response.data.success) {
          setStats({
            streak: response.data.data.streak?.days || 0,
            rank: "Top 5%", // Mock rank, or compute if possible
          });
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Link to={"/profile"}>
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-8 space-y-6">
          {/* User Badge */}
          <div className="group flex cursor-pointer items-center gap-4 rounded-[2rem] border border-white/5 bg-white/[0.02] p-4 transition hover:border-cyan-500/20 hover:bg-white/[0.04]">
            <Avatar
              name={user.name || "Unknown"}
              src={user.profilePicture}
              size="h-12 w-12"
              className="rounded-full shadow-lg"
            />
            <div className="min-w-0">
              <p className="truncate font-['Fraunces',_serif] text-base font-bold text-[#EDE7DA] group-hover:text-cyan-100">
                {user.name || "Unknown"}
              </p>
              <p className="truncate text-xs font-medium text-slate-500">
                @{user.username}
              </p>
            </div>
          </div>

          {/* Discovery Bento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-between rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 shadow-2xl transition hover:border-white/10 hover:bg-white/[0.04]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-300 mb-4">
                <FaTrophy className="text-lg" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#EDE7DA]/50 uppercase tracking-widest mb-1">
                  Rank
                </p>
                <p className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]">
                  {stats.rank}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 shadow-2xl transition hover:border-white/10 hover:bg-white/[0.04]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-500/10 text-fuchsia-300 mb-4">
                <FaFire className="text-lg" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#EDE7DA]/50 uppercase tracking-widest mb-1">
                  Streak
                </p>
                <p className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]">
                  {stats.streak} {stats.streak === 1 ? "Day" : "Days"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </Link>
  );
};

export default DashboardSidebar;
