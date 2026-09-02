"use server";

import { supabase } from "@/lib/supabaseClient";

/**
 * Crea una orden y sus items en una sola transacción vía RPC.
 * @param {Object} formValues - { businessName, taxId, address, phone, email, notes }
 * @param {Array}  items      - array en formato { product_id, product_name, unit_price, quantity }
 */
export async function createOrder(formValues, items) {
const { businessName, taxId, address, phone, email, notes } = formValues;

if (!businessName?.trim() || !taxId?.trim() || !address?.trim() || !phone?.trim()) {
    return {
    success: false,
    message: "Completá todos los campos obligatorios.",
    };
}

if (!items || items.length === 0) {
    return { success: false, message: "Tu carrito está vacío." };
}

const { data, error } = await supabase.rpc("create_order_with_items", {
    p_business_name: businessName.trim(),
    p_tax_id: taxId.trim(),
    p_address: address.trim(),
    p_phone: phone.trim(),
    p_email: email?.trim() || null,
    p_notes: notes?.trim() || null,
    p_items: items,
});

if (error) {
    console.error("Error al crear el pedido:", error.message);
    return {
    success: false,
    message: "No pudimos registrar tu pedido. Probá nuevamente en unos minutos.",
    };
}

return { success: true, orderId: data };
}