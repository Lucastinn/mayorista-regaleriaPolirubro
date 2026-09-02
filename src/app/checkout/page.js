"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { createOrder } from "./actions";
import {
buildOrderWhatsappMessage,
getWhatsappCheckoutUrl,
} from "@/lib/whatsapp";

function formatARS(value) {
return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
}).format(value);
}

const initialForm = {
businessName: "",
taxId: "",
address: "",
phone: "",
email: "",
notes: "",
};

export default function CheckoutPage() {
const router = useRouter();
const items = useCartStore((state) => state.items);
const total = useCartStore((state) => state.getTotal());
const getOrderItems = useCartStore((state) => state.getOrderItems);
const clearCart = useCartStore((state) => state.clearCart);

const [form, setForm] = useState(initialForm);
const [error, setError] = useState("");
const [isPending, startTransition] = useTransition();

  // Evita que el useEffect de "carrito vacío" redirija a "/"
  // justo después de vaciar el carrito tras un pedido exitoso.
const orderCompletedRef = useRef(false);

useEffect(() => {
    if (items.length === 0 && !orderCompletedRef.current) {
    router.replace("/");
    }
}, [items, router]);

function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
}

function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const orderItems = getOrderItems();

    startTransition(async () => {
    const result = await createOrder(form, orderItems);

    if (!result.success) {
        setError(result.message);
        return;
    }

    orderCompletedRef.current = true;

    const message = buildOrderWhatsappMessage({
        orderId: result.orderId,
        items: orderItems,
        businessName: form.businessName,
        total,
    });

    clearCart();

    window.location.href = getWhatsappCheckoutUrl(message);
    });
}

  // Mientras el useEffect resuelve la redirección, no renderizamos el form.
if (items.length === 0) {
    return null;
}

return (
    <main className="mx-auto max-w-4xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
    <header className="mb-8">
        <Link
        href="/carrito"
        className="text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
        >
        ← Volver al carrito
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
        Finalizar pedido
        </h1>
        <p className="mt-1 text-sm text-gray-500">
        Completá tus datos para coordinar el pago y el envío por WhatsApp.
        </p>
    </header>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6"
        >
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Razón social *
            </label>
            <input
            type="text"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
            />
        </div>

        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              CUIT *
            </label>
            <input
            type="text"
            name="taxId"
            value={form.taxId}
            onChange={handleChange}
            placeholder="20-12345678-9"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
            />
        </div>

        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Dirección de entrega *
            </label>
            <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
            />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                Teléfono *
            </label>
            <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
            />
            </div>

            <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                Email (opcional)
            </label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
            />
            </div>
        </div>

        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
            Notas (opcional)
            </label>
            <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Horario de entrega, referencias, etc."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
            />
        </div>

        {error && (
            <p className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600">
            {error}
            </p>
        )}

        <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {isPending
            ? "Enviando pedido..."
            : "Confirmar pedido y coordinar por WhatsApp"}
        </button>
        </form>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-24">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Resumen del pedido
        </h2>

        <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
            {items.map((item) => (
            <div
                key={item.id}
                className="flex justify-between text-xs text-gray-600"
            >
                <span className="truncate pr-2">
                {item.quantity}x {item.name}
                </span>
                <span className="shrink-0 font-medium text-gray-900">
                  {formatARS(item.price * item.quantity)}
                </span>
            </div>
            ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-base font-medium text-gray-600">Total</span>
            <span className="text-2xl font-bold text-gray-900">
            {formatARS(total)}
            </span>
        </div>
        </aside>
    </div>
    </main>
);
}