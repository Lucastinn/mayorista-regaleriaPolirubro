"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/admin/actions";
import { useToast } from "./ToastProvider";

export default function DeleteProductButton({ id, productName }) {
const [isPending, startTransition] = useTransition();
const router = useRouter();
const { showToast } = useToast();

function handleDelete() {
    const confirmed = confirm(
    `¿Eliminar "${productName}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    startTransition(async () => {
    try {
        await deleteProduct(id);
        showToast("Producto eliminado correctamente.", "success");
        router.refresh();
    } catch (err) {
        showToast(
        err?.message || "Error al eliminar el producto.",
        "error"
        );
    }
    });
}

return (
    <button
    onClick={handleDelete}
    disabled={isPending}
    className="text-xs font-medium text-red-500 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
    >
    {isPending ? "Eliminando..." : "Eliminar"}
    </button>
);
}