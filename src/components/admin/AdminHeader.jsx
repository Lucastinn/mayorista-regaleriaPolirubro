"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminHeader() {
const router = useRouter();

async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
}

return (
    <header className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
    <div>
        <Link href="/admin" className="text-lg font-bold text-gray-900">
        Panel de administración
        </Link>
        <p className="text-xs text-gray-400">Mayorista MVP</p>
    </div>
    <div className="flex items-center gap-3">
        <Link
        href="/"
        className="text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
        >
        Ver catálogo
        </Link>
        <button
        onClick={handleLogout}
        className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
        Cerrar sesión
        </button>
    </div>
    </header>
);
}