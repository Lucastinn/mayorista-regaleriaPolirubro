import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "./actions";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import AdminHeader from "@/components/admin/AdminHeader";

function formatARS(value) {
return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
}).format(value);
}

export default async function AdminDashboard() {
const supabase = await createClient();

const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <AdminHeader />

    <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Productos</h1>
        <Link
        href="/admin/productos/nuevo"
        className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
        + Nuevo producto
        </Link>
    </div>

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
                <td className="px-4 py-3 capitalize text-gray-500">
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
                    deleteAction={deleteProduct.bind(null, product.id)}
                    />
                </div>
                </td>
            </tr>
            ))}
        </tbody>
        </table>

        {products?.length === 0 && (
        <p className="p-8 text-center text-sm text-gray-400">
            Todavía no cargaste productos.
        </p>
        )}
    </div>
    </main>
);
}