import { FaArrowRight, FaUserSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../lib/axois.js";

const DeleteProfile = () => {
  const { setUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [deleteProfile, setDeleteProfile] = useState({
    username: "",
    currentPassword: "",
  });

  const onDeleteUser = (e) => {
    setDeleteProfile({
      ...deleteProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await api.delete("/users/deleteprofile", {
        data: deleteProfile,
      });
      setUser(null);
      if (response) {
        toast.success("Profile deleted successfully");
      }
    } catch (err) {
      console.log(err.response.data.field, err.response.data.message, err.response.status);
      setErrors({
        [err.response.data.field]: err.response.data.message,
        ErrorCode: err.response.status,
      });
      toast.error("Failed to delete profile");
    }
  };

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
            <span className="text-sm font-medium text-slate-200">Username</span>
            {errors.username && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.username}
              </p>
            )}
            <input
              id="username"
              type="text"
              name="username"
              onChange={onDeleteUser}
              value={deleteProfile.username}
              placeholder="Username"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900/80"
            />
          </label>
        </div>

        <div className="mt-5 space-y-3">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">Password</span>
            {errors.currentPassword && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.currentPassword}
              </p>
            )}
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="Current password"
              onChange={onDeleteUser}
              value={deleteProfile.currentPassword}
              className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900/80 ${errors.currentPassword ? "border-red-500 focus:border-red-400 focus:bg-slate-900" : ""}`}
            />
          </label>
        </div>

        <button
          type="button"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition bg-cyan-300 text-slate-900 hover:bg-cyan-200"
          onClick={handleDeleteProfile}
        >
          Delete Profile
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </article>
  );
};

export default DeleteProfile;
