import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
