import { FaImage } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

const UploadButton = ({ type, setFile }) => {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/[0.02] px-4 py-2 text-xs font-bold text-white transition hover:border-white/40 hover:bg-white/[0.06]">
      {type === "image" && <FaImage className="text-sm text-fuchsia-400" />}
      {type === "pdf" && <FaFilePdf className="text-sm text-amber-400" />}
      <span>Attach {type === "image" ? "Image" : "PDF"}</span>
      <input 
        type="file" 
        className="hidden" 
        accept={`${type === "image" ? "image/*" : "application/pdf"}`} 
        onChange={(e) => setFile(e.target.files[0])} 
      />
    </label>
  );
};

export default UploadButton;