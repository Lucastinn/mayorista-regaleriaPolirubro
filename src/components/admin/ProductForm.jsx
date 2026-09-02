"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { useToast } from "./ToastProvider";

const CATEGORIES = [
{ value: "electronica", label: "Electrónica" },
{ value: "bijouteria", label: "Bijouterie" },
{ value: "juguetes", label: "Juguetes" },
{ value: "regalos", label: "Regalos" },
];

const initialState = { success: false, message: "" };

export default function ProductForm({ action, product }) {
const [state, formAction] = useActionState(action, initialState);
const router = useRouter();
const { showToast } = useToast();

useEffect(() => {
    if (state.success) {
    showToast(state.message, "success");
    router.refresh();
    router.push("/admin");
    } else if (state.message) {
    showToast(state.message, "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [state]);

return (
    <form action={formAction} className="flex flex-col gap-4">
    <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
        Nombre
        </label>
        <input
        type="text"
        name="name"
        defaultValue={product?.name}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
        />
    </div>

    <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
        Categoría
        </label>
        <select
        name="category"
        defaultValue={product?.category || CATEGORIES[0].value}
        required
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
        >
        {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
            {cat.label}
            </option>
        ))}
        </select>
    </div>

    <div className="grid grid-cols-2 gap-4">
        <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
            Precio (ARS)
        </label>
        <input
            type="number"
            name="price"
            min="0"
            step="1"
            defaultValue={product?.price}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
        />
        </div>

        <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
            Stock
        </label>
        <input
            type="number"
            name="stock"
            min="0"
            step="1"
            defaultValue={product?.stock}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
        />
        </div>
    </div>

    <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
        URL de imagen
        </label>
        <input
        type="text"
        name="image"
        defaultValue={product?.image || "/placeholder.jpg"}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
        />
    </div>

    <SubmitButton
        idleLabel={product ? "Guardar cambios" : "Crear producto"}
        pendingLabel={product ? "Guardando..." : "Creando..."}
    />
    </form>
);
}