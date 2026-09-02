"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createProduct(prevState, formData) {
const supabase = await createClient();

const name = formData.get("name");
const category = formData.get("category");
const price = Number(formData.get("price"));
const stock = Number(formData.get("stock"));
const image = formData.get("image") || "/placeholder.jpg";

if (!name || !category || Number.isNaN(price) || Number.isNaN(stock)) {
    return {
    success: false,
    message: "Completá todos los campos correctamente.",
    };
}

const { error } = await supabase.from("products").insert({
    name,
    category,
    price,
    stock,
    image,
});

if (error) {
    return {
    success: false,
    message: `No se pudo crear el producto: ${error.message}`,
    };
}

revalidatePath("/admin");
revalidatePath("/");

return { success: true, message: "Producto creado correctamente." };
}

export async function updateProduct(id, prevState, formData) {
const supabase = await createClient();

const name = formData.get("name");
const category = formData.get("category");
const price = Number(formData.get("price"));
const stock = Number(formData.get("stock"));
const image = formData.get("image") || "/placeholder.jpg";

if (!name || !category || Number.isNaN(price) || Number.isNaN(stock)) {
    return {
    success: false,
    message: "Completá todos los campos correctamente.",
    };
}

const { error } = await supabase
    .from("products")
    .update({ name, category, price, stock, image })
    .eq("id", id);

if (error) {
    return {
    success: false,
    message: `No se pudo actualizar el producto: ${error.message}`,
    };
}

revalidatePath("/admin");
revalidatePath("/");

return { success: true, message: "Producto actualizado correctamente." };
}

export async function deleteProduct(id) {
const supabase = await createClient();

const { error } = await supabase.from("products").delete().eq("id", id);

if (error) {
    throw new Error(`No se pudo eliminar el producto: ${error.message}`);
}

revalidatePath("/admin");
revalidatePath("/");
}