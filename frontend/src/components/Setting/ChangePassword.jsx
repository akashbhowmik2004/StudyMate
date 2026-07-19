import { FaArrowRight, FaLock } from "react-icons/fa";
import { useState } from "react";
import { api } from "../../lib/axois.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const onChangePassword = async (e) => {
    e.preventDefault();
    try {
      const { currentPassword, newPassword, confirmNewPassword } = passwordData;
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        toast.error("Please fill in all fields.");
        return;
      }
      const response = await api.patch("/users/profile", passwordData);

      console.log(response);
      toast.success("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setErrors({});
      navigate("/settings");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password.");
      setErrors({
        [error.response.data.field]: error.response.data.message,
        ErrorCode: error.response.status,
      });
    }
  };

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-300/20 to-teal-300/10 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <div className="h-full rounded-[1.45rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
              <FaLock className="text-lg" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">
              Change Password
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Current password
            </span>
            {errors.currentPassword && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.currentPassword}
              </p>
            )}
            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              placeholder="Current password"
              className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900/80 ${errors.currentPassword ? "border-red-500 focus:border-red-400 focus:bg-slate-900" : ""}`}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              New password
            </span>
            {errors.newPassword && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.newPassword}
              </p>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                placeholder="New password"
                className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900/80 ${errors.newPassword ? "border-red-500 focus:border-red-400 focus:bg-slate-900" : ""}`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Confirm password
            </span>
            {errors.confirmNewPassword && (
              <p className="mt-1.5 text-xs font-medium text-red-400">
                {errors.confirmNewPassword}
              </p>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handleChange}
                placeholder="Enter password to confirm"
                className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:bg-slate-900/80 ${errors.confirmNewPassword ? "border-red-500 focus:border-red-400 focus:bg-slate-900" : ""}`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>
        </div>

        <button
          type="button"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition bg-cyan-300 text-slate-900 hover:bg-cyan-200"
          onClick={onChangePassword}
        >
          Update Password
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </article>
  );
};

export default ChangePassword;
