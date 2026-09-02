import { ToastProvider } from "@/components/admin/ToastProvider";

export default function AdminLayout({ children }) {
return <ToastProvider>{children}</ToastProvider>;
}