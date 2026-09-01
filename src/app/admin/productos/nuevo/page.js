import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "../../actions";

export default function NuevoProductoPage() {
return (
    <main className="mx-auto max-w-lg px-4 py-10 sm:px-6 lg:px-8">
    <AdminHeader />

    <Link
        href="/admin"
        className="mb-4 inline-block text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
    >
        ← Volver al listado
    </Link>

    <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="mb-6 text-lg font-bold text-gray-900">
        Nuevo producto
        </h1>
        <ProductForm action={createProduct} />
    </div>
    </main>
);
}