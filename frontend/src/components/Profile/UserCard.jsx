import {api} from "../../lib/axois.js";
import {useToast} from "../../context/ToastContext.jsx";
const UserCard = ({
  req,
  Avatar,
  handleAcceptRequest,
  handleDeclineRequest,
  setPendingRequests,
}) => {
  const { showToast } = useToast();
  const handleAcceptRequest2 = async (id, name) => {
    try {
      await api.put(`/accept-request/${id}`, { requestId: req._id});
      setPendingRequests((prev) => prev.filter((req) => req.id !== id));
      showToast(`You accepted ${name}'s follow request!`);
    } catch (error) {
      console.error("Error accepting follow request:", error);
      showToast("Failed to accept follow request.", false);
    }
  };
  console.log("UserCard received request:", req); // Log the entire request object
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar name={req.sender.name} size="h-10 w-10" />
        <div>
          <p className="text-sm font-bold text-[#EDE7DA]">{req.sender.name}</p>
          <p className="text-xs font-medium text-slate-500">
            @{req.sender.username}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleAcceptRequest(req.id, req.sender.name)}
          className="flex-1 sm:flex-none rounded-xl bg-cyan-500/20 px-4 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-500/30 hover:text-cyan-200"
        >
          Accept
        </button>
        <button
          onClick={() => handleDeclineRequest(req.id)}
          className="flex-1 sm:flex-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          Decline
        </button>
      </div>
    </>
  );
};

export default UserCard;
