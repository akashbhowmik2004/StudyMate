import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { api } from "../../lib/axois.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../context/useAuth.jsx";

const ChangeEmail = () => {
  const { setUser } = useAuth();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [email, setEmail] = useState({
    newEmail: " ",
    currentPassword: "",
  });

  const handleChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetEmail = async (e) => {
    e.preventDefault();
    try {
      const { newEmail, currentPassword } = email;
      if (!newEmail || !currentPassword) {
        toast.error("Please fill in all fields.");
        return;
      }
      const response = await api.patch("/users/profile", email);
      console.log(response.data);
      setUser(response.data.user);
      console.log(response);
      toast.success("Email updated successfully!");
      setEmail({
        newEmail: "",
        currentPassword: "",
      });
      setErrors({});
      navigate("/settings");
    } catch (err) {
      toast.error("Something went wrong");
      setErrors({
        [err.response.data.field]: err.response.data.message,
        ErrorCode: err.response.status,
      });
    }
  };

  return (
    <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-300/20 to-teal-300/10 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <div className="h-full rounded-[1.45rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
              <FaEnvelope className="text-lg" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">
              Change Email
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Update the email address tied to your StudyMate account and keep
              recovery details current.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Current email
            </span>
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.email}
              </p>
            )}
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900/80 ${errors.email ? "border-red-500 focus:border-red-400 focus:bg-slate-900" : ""}`}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              New email
            </span>
            {errors.newEmail && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.newEmail}
              </p>
            )}
            <input
              type="email"
              name="newEmail"
              onChange={handleChange}
              value={email.newEmail}
              placeholder="new-email@example.com"
              className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900/80 ${errors.newEmail ? "border-red-500 focus:border-red-400 focus:bg-slate-900" : ""}`}
            />
          </label>
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
              onChange={handleChange}
              value={email.currentPassword}
              placeholder="Enter password to confirm"
              className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900/80 ${errors.currentPassword ? "border-red-500 focus:border-red-400 focus:bg-slate-900" : ""}`}
            />
          </label>
        </div>

        <button
          type="button"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition bg-cyan-300 text-slate-900 hover:bg-cyan-200"
          onClick={handleSetEmail}
        >
          Update Email
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </article>
  );
};

export default ChangeEmail;
