import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

const PAGE_SIZE = 8;

function formatARS(value) {
return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
}).format(value);
}

export default async function AdminDashboard({ searchParams }) {
const params = await searchParams;
const q = (params?.q || "").trim();
const page = Math.max(1, Number(params?.page) || 1);

  const from = (page - 1) * PAGE_SIZE;
const to = from + PAGE_SIZE - 1;

const supabase = await createClient();

let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

if (q) {
    query = query.ilike("name", `%${q}%`);
}

const { data: products, error, count } = await query;

const totalPages = count ? Math.max(1, Math.ceil(count / PAGE_SIZE)) : 1;

return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <AdminHeader />

    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-gray-900">Productos</h1>
        <Link
        href="/admin/productos/nuevo"
        className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
        + Nuevo producto
        </Link>
    </div>

    <form
        method="GET"
        action="/admin"
        className="mb-4 flex flex-wrap items-center gap-2"
    >
        <input type="hidden" name="page" value="1" />
        <input
        type="text"
        name="q"
        defaultValue={q}
        placeholder="Buscar por nombre..."
        className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
        />
        <button
        type="submit"
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
        Buscar
        </button>
        {q && (
        <Link
            href="/admin"
            className="text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
        >
            Limpiar búsqueda
        </Link>
        )}
    </form>

    {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
        Error al cargar productos: {error.message}
        </p>
    )}

    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
            <tr>
            <th className="px-4 py-3 text-left">Producto</th>
            <th className="px-4 py-3 text-left">Categoría</th>
            <th className="px-4 py-3 text-left">Precio</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
            {products?.map((product) => (
            <tr key={product.id}>
                <td className="px-4 py-3 font-medium text-gray-900">
                {product.name}
                </td>
                <td className="px-4 py-3 capitalize text-gray-700">
                {product.category}
                </td>
                <td className="px-4 py-3 text-gray-700">
                {formatARS(product.price)}
                </td>
                <td className="px-4 py-3">
                <span
                    className={
                    product.stock === 0
                        ? "font-medium text-red-500"
                        : "text-gray-700"
                    }
                >
                    {product.stock}
                </span>
                </td>
                <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                    <Link
                    href={`/admin/productos/${product.id}`}
                    className="text-xs font-medium text-gray-600 hover:underline"
                    >
                    Editar
                    </Link>
                    <DeleteProductButton
                    id={product.id}
                    productName={product.name}
                    />
                </div>
                </td>
            </tr>
            ))}
        </tbody>
        </table>

        {products?.length === 0 && (
        <p className="p-8 text-center text-sm text-gray-400">
            {q
            ? `No se encontraron productos para "${q}".`
            : "Todavía no cargaste productos."}
        </p>
        )}
    </div>

    {products?.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="text-gray-500">
            Página {page} de {totalPages} — {count} producto
            {count === 1 ? "" : "s"}
        </span>
        <div className="flex gap-2">
            <Link
            href={`/admin?q=${encodeURIComponent(q)}&page=${page - 1}`}
            aria-disabled={page <= 1}
            className={`rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium ${
                page <= 1
                ? "pointer-events-none opacity-40"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            >
            ← Anterior
            </Link>
            <Link
            href={`/admin?q=${encodeURIComponent(q)}&page=${page + 1}`}
            aria-disabled={page >= totalPages}
            className={`rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium ${
                page >= totalPages
                ? "pointer-events-none opacity-40"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            >
            Siguiente →
            </Link>
        </div>
        </div>
    )}
    </main>
);
}