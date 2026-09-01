import { supabase } from "@/lib/supabaseClient";

/**
 * Trae los productos desde la tabla 'products' de Supabase.
 * Reemplaza la lectura del JSON local.
 */
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al obtener productos de Supabase:", error.message);
    return [];
  }

  return data;
}