import { FaCamera, FaCheck, FaEdit, FaTimes } from "react-icons/fa";
const ProfileCard = ({
  profile,
  Avatar,
  fileInputRef,
  isEditingUsername,
  editUsernameVal,
  handleImageUpload,
  handleSaveUsername,
  setEditUsernameVal,
  setIsEditingUsername,
  isEditingBio,
  editBioVal,
  setEditBioVal,
  setIsEditingBio,
  handleSaveBio,
}) => {
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
      {/* Avatar with Hover Edit */}
      <div className="relative group shrink-0">
        <Avatar
          name={profile?.name || "User"}
          imageUrl={profile?.profilePicture || null}
          size="h-24 w-24"
          className="shadow-2xl"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 flex items-center justify-center rounded-[1.5rem] bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm"
        >
          <FaCamera className="text-xl text-white" />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </div>

      {/* Name & Username Edit */}
      <div className="flex-1 min-w-0">
        <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-white truncate">
          {profile?.name || "User"}
        </h2>

        <div className="mt-2 flex items-center gap-3">
          {isEditingUsername ? (
            <div className="flex w-full items-center gap-2 rounded-xl border border-cyan-500/40 bg-white/[0.02] p-1.5 shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]">
              <span className="pl-3 text-sm font-bold text-slate-500">@</span>
              <input
                autoFocus
                value={editUsernameVal}
                onChange={(e) => setEditUsernameVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveUsername()}
                className="w-full bg-transparent text-sm font-bold text-[#EDE7DA] outline-none"
              />
              <button
                onClick={handleSaveUsername}
                className="rounded-lg bg-cyan-500/20 p-2 text-cyan-300 hover:bg-cyan-500/40 transition"
              >
                <FaCheck className="text-xs" />
              </button>
              <button
                onClick={() => {
                  setIsEditingUsername(false);
                  setEditUsernameVal(profile.username);
                }}
                className="rounded-lg bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
          ) : (
            <div className="group flex items-center gap-2">
              <p className="text-sm font-bold text-slate-400 truncate">
                @{profile.username}
              </p>
              <button
                onClick={() => setIsEditingUsername(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 p-1 hover:text-cyan-300"
              >
                <FaEdit className="text-sm" />
              </button>
            </div>
          )}
        </div>

        {/* Bio Edit */}
        <div className="mt-4">
          {isEditingBio ? (
            <div className="flex w-full items-start gap-2 rounded-xl border border-cyan-500/40 bg-white/[0.02] p-2 shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]">
              <textarea
                autoFocus
                value={editBioVal}
                onChange={(e) => setEditBioVal(e.target.value)}
                maxLength={50}
                placeholder="Add a short bio..."
                className="w-full resize-none bg-transparent text-sm text-[#EDE7DA] outline-none"
                rows={2}
              />
              <div className="flex flex-col gap-1">
                <button
                  onClick={handleSaveBio}
                  className="rounded-lg bg-cyan-500/20 p-2 text-cyan-300 hover:bg-cyan-500/40 transition"
                >
                  <FaCheck className="text-xs" />
                </button>
                <button
                  onClick={() => {
                    setIsEditingBio(false);
                    setEditBioVal(profile.desc || "");
                  }}
                  className="rounded-lg bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            </div>
          ) : (
            <div className="group relative pr-8">
              <p className="text-sm text-slate-300">
                {profile?.desc || "No bio added yet."}
              </p>
              <button
                onClick={() => setIsEditingBio(true)}
                className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 p-1 hover:text-cyan-300"
              >
                <FaEdit className="text-sm" />
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
