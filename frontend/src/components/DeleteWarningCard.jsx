
import { useRef, useEffect } from "react";
import {createPortal} from "react-dom";
const DeleteWarningCard = ({children,open,onClose}) => {
  const dialog = useRef();
  useEffect(() => {
    if(open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className="flex w-full max-w-sm flex-col rounded-3xl border border-white/[0.08] bg-[#1A1816] p-6 shadow-2xl">
      {children}
    </dialog>,
    document.getElementById("portal-root"),
  );
};

export default DeleteWarningCard;
