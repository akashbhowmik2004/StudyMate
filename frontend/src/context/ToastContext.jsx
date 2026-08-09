import { createContext, useContext, useState, useRef } from "react";
import ToastNotification from "../components/Common/ToastNotification.jsx";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", success: true });
  const timerRef = useRef(null);

  // Added the success parameter, defaulting to true
  const showToast = (message, success = true, duration = 3000) => {
    setToast({ message, success });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, message: "" }));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastNotification message={toast.message} success={toast.success} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);