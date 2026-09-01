"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
const router = useRouter();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    });

    setLoading(false);

    if (error) {
    setError("Email o contraseña incorrectos.");
    return;
    }

    router.push("/admin");
    router.refresh();
}

return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >
        <h1 className="text-xl font-bold text-gray-900">
        Panel de administración
        </h1>
        <p className="mt-1 text-sm text-gray-500">
        Ingresá con tu cuenta para gestionar el catálogo.
        </p>

        <div className="mt-6 flex flex-col gap-4">
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
            Email
            </label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
            />
        </div>

        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
            Contraseña
            </label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
            />
        </div>

        {error && (
            <p className="text-xs font-medium text-red-500">{error}</p>
        )}

        <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
            {loading ? "Ingresando..." : "Ingresar"}
        </button>
        </div>
    </form>
    </main>
);
}