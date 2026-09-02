"use client";

import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
const [toasts, setToasts] = useState([]);

const showToast = useCallback((message, type = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
}, []);

function dismiss(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
}

return (
    <ToastContext.Provider value={{ showToast }}>
    {children}

    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
        <div
            key={t.id}
            onClick={() => dismiss(t.id)}
            className={`pointer-events-auto max-w-xs cursor-pointer rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg transition-all ${
            t.type === "error" ? "bg-red-500" : "bg-gray-900"
            }`}
        >
            {t.message}
        </div>
        ))}
    </div>
    </ToastContext.Provider>
);
}

export function useToast() {
const ctx = useContext(ToastContext);
if (!ctx) {
    throw new Error("useToast debe usarse dentro de <ToastProvider>");
}
return ctx;
}