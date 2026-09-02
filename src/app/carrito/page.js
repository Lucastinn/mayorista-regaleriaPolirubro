"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

function formatARS(value) {
return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
}).format(value);
}

export default function CarritoPage() {
const items = useCartStore((state) => state.items);
const total = useCartStore((state) => state.getTotal());
const addItem = useCartStore((state) => state.addItem);
const decreaseItem = useCartStore((state) => state.decreaseItem);
const removeItem = useCartStore((state) => state.removeItem);
const clearCart = useCartStore((state) => state.clearCart);

const isEmpty = items.length === 0;

if (isEmpty) {
    return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pt-32 pb-16 text-center sm:px-6 lg:px-8">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
        </svg>
        <h1 className="mt-4 text-xl font-bold text-gray-900">
        Tu carrito está vacío
        </h1>
        <p className="mt-1 text-sm text-gray-500">
        Todavía no agregaste productos al pedido.
        </p>
        <Link
        href="/"
        className="mt-6 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
        Volver al catálogo
        </Link>
    </main>
    );
}

return (
    <main className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
    <div className="mb-8 flex items-center justify-between">
        <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Tu carrito
        </h1>
        <p className="mt-1 text-sm text-gray-500">
            Revisá tu pedido antes de continuar.
        </p>
        </div>
        <button
        onClick={clearCart}
        className="text-xs font-medium text-gray-400 underline-offset-2 hover:text-red-500 hover:underline"
        >
        Vaciar carrito
        </button>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="hidden border-b border-gray-100 pb-3 text-xs font-semibold uppercase tracking-wide text-gray-400 md:grid md:grid-cols-[64px_1fr_110px_130px_110px_32px] md:gap-4">
            <span></span>
            <span>Producto</span>
            <span>Precio unit.</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
            <span></span>
        </div>

        <div className="divide-y divide-gray-100">
            {items.map((item) => {
                const subtotal = item.price * item.quantity;
                const reachedStockLimit = item.quantity >= item.stock;

            return (
                <div
                key={item.id}
                className="flex flex-col gap-4 py-4 md:grid md:grid-cols-[64px_1fr_110px_130px_110px_32px] md:items-center md:gap-4"
                >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    />
                </div>

                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                    {item.name}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                    {item.category}
                    </p>
                </div>

                <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-400 md:hidden">
                    Precio unit.:{" "}
                    </span>
                    {formatARS(item.price)}
                </div>

                <div className="flex items-center gap-2">
                    <button
                    onClick={() => decreaseItem(item.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100"
                    aria-label="Restar cantidad"
                    >
                    −
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-gray-900">
                    {item.quantity}
                    </span>
                    <button
                    onClick={() => addItem(item)}
                    disabled={reachedStockLimit}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Sumar cantidad"
                    title={
                        reachedStockLimit
                        ? "Alcanzaste el stock disponible"
                        : undefined
                    }
                    >
                    +
                    </button>
                </div>

                <div className="text-sm font-semibold text-gray-900">
                    <span className="font-medium text-gray-400 md:hidden">
                    Subtotal:{" "}
                    </span>
                    {formatARS(subtotal)}
                </div>

                <button
                    onClick={() => removeItem(item.id)}
                    className="flex h-7 w-7 items-center justify-center self-start rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 md:self-center"
                    aria-label="Eliminar producto"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
                </div>
            );
            })}
        </div>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-24">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Resumen del pedido
        </h2>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-base font-medium text-gray-600">Total</span>
            <span className="text-2xl font-bold text-gray-900">
            {formatARS(total)}
            </span>
        </div>

        <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
            Continuar con mis datos →
        </Link>

        <Link
            href="/"
            className="mt-3 block text-center text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
        >
            Seguir comprando
        </Link>
        </aside>
    </div>
    </main>
);
}