import products from "@/data/products.json";

/**
 * Devuelve la lista de productos.
 * Hoy lee del JSON local. El día que tengas backend/DB real,
 * esta es la ÚNICA función que necesitás mutar (fetch a tu API,
 * query a la DB, etc.) sin tocar nada de la UI.
 */
export async function getProducts() {
  // TODO: reemplazar por fetch("/api/products") o consulta a la DB
return products;
}