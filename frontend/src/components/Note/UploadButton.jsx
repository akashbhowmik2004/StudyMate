import {FaImage,} from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

const UploadButton = ({type, setFile}) => {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]">
      {type === "image" && <FaImage className="text-sm text-[#6FCF97]" />}
      {type === "pdf" && <FaFilePdf className="text-sm text-[#F2735B]" />}
      Attach {type}
      <input type="file" accept={`${type === "image" ? "image/*" : "application/pdf"}`} onChange={(e) => setFile(e.target.files[0])} />
    </label>
  );
};

export default UploadButton;
