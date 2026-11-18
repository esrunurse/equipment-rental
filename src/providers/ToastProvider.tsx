"use client";
import { createContext, useCallback, useContext, useState } from "react";
import Toast from "@/components/Toast";

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState({ id: 0, message: "" });
  const showToast = useCallback((message: string) => setToast((current) => ({ id: current.id + 1, message })), []);
  const hideToast = useCallback(() => setToast((current) => ({ ...current, message: "" })), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast key={toast.id} message={toast.message} onClose={hideToast} />
    </ToastContext.Provider>
  );
}
