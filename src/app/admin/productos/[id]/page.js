import Link from "next/link";
import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "../../actions";

export default async function EditarProductoPage({ params }) {
const { id } = await params;
const supabase = await createClient();

const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

if (!product) {
    notFound();
}

const updateProductWithId = updateProduct.bind(null, id);

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
        Editar producto
        </h1>
        <ProductForm action={updateProductWithId} product={product} />
    </div>
    </main>
);
}