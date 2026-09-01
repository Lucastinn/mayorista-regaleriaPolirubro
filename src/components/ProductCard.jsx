"use client";

import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
const addItem = useCartStore((state) => state.addItem);
const outOfStock = product.stock <= 0;

const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
}).format(product.price);

return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
    <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {outOfStock && (
        <span className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
            Sin stock
        </span>
        )}
    </div>

    <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="w-fit rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-gray-500">
        {product.category}
        </span>

        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
        {product.name}
        </h3>

        <p className="text-xs text-gray-400">Stock: {product.stock}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
        <span className="text-lg font-bold text-gray-900">
            {formattedPrice}
        </span>
        </div>

        <button
        onClick={() => addItem(product)}
        disabled={outOfStock}
        className="mt-2 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
        {outOfStock ? "Sin stock" : "Agregar al carrito"}
        </button>
    </div>
    </div>
);
}