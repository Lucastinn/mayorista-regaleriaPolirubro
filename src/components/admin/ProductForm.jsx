const CATEGORIES = [
  { value: "electronica", label: "Electrónica" },
  { value: "bijouteria", label: "Bijouterie" },
  { value: "juguetes", label: "Juguetes" },
  { value: "regalos", label: "Regalos" },
];

export default function ProductForm({ action, product }) {
return (
    <form action={action} className="flex flex-col gap-4">
    <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
        Nombre
        </label>
        <input
        type="text"
        name="name"
        defaultValue={product?.name}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
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
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
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
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
        />
    </div>

    <button
        type="submit"
        className="mt-2 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
    >
        {product ? "Guardar cambios" : "Crear producto"}
    </button>
    </form>
);
}