"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/productService";

const CATEGORIES = [
  { value: "todos", label: "Todos" },
  { value: "electronica", label: "Electrónica" },
  { value: "bijouteria", label: "Bijouterie" },
  { value: "juguetes", label: "Juguetes" },
  { value: "regalos", label: "Regalos" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      const data = await getProducts();
      if (mounted) {
        setProducts(data);
        setIsLoading(false);
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts =
    activeCategory === "todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Catálogo Mayorista
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Precios especiales por volumen para revendedores.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="py-16 text-center text-sm text-gray-400">
            Cargando productos...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">
            No hay productos en esta categoría.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}