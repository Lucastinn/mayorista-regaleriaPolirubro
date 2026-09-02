// TODO: reemplazar por el número real de WhatsApp del negocio (código país + área + número, sin '+')
const WHATSAPP_NUMBER = "5493446369242";

function formatARS(value) {
return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
}).format(value);
}

/**
 * Arma el texto del mensaje de WhatsApp a partir de una orden ya creada.
 * @param {Object} params
 * @param {number} params.orderId - id devuelto por create_order_with_items
 * @param {Array}  params.items   - array con { product_name, unit_price, quantity }
 * @param {string} params.businessName
 * @param {number} params.total
 */
export function buildOrderWhatsappMessage({
orderId,
items,
businessName,
total,
}) {
let message = `Hola! Quiero confirmar mi pedido #${orderId}`;
if (businessName) {
    message += ` a nombre de ${businessName}`;
}
message += ":\n\n";

items.forEach((item) => {
    const subtotal = item.unit_price * item.quantity;
    message += `- ${item.quantity}x ${item.product_name} (${formatARS(
    item.unit_price
    )} c/u) = ${formatARS(subtotal)}\n`;
});

message += `\nTotal: ${formatARS(total)}\n\n`;
message +=
    "Quedo a la espera de los datos para coordinar la transferencia y el envío. ¡Gracias!";

return message;
}

export function getWhatsappCheckoutUrl(message) {
return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
)}`;
}