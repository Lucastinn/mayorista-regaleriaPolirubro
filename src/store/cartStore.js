import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
persist(
    (set, get) => ({
    items: [],

    // Agrega un producto. Si ya existe, suma cantidad.
    addItem: (product) =>
        set((state) => {
        const existing = state.items.find((item) => item.id === product.id);

        if (existing) {
            return {
            items: state.items.map((item) =>
                item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            };
        }

        return {
            items: [...state.items, { ...product, quantity: 1 }],
        };
        }),

      // Resta 1 al producto. Si llega a 0, lo elimina del carrito.
    decreaseItem: (id) =>
        set((state) => {
        const existing = state.items.find((item) => item.id === id);
        if (!existing) return state;

        if (existing.quantity <= 1) {
            return { items: state.items.filter((item) => item.id !== id) };
        }

        return {
            items: state.items.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
        };
        }),

      // Elimina el producto por completo, sin importar la cantidad.
    removeItem: (id) =>
        set((state) => ({
        items: state.items.filter((item) => item.id !== id),
        })),

    clearCart: () => set({ items: [] }),

      // Total a pagar
    getTotal: () => {
        const { items } = get();
        return items.reduce(
          (acc, item) => acc + item.price * item.quantity,
        0
        );
    },

      // Cantidad total de unidades (útil para el badge del Navbar)
    getTotalItems: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.quantity, 0);
    },
    }),
    {
      name: "cart-storage", // key en localStorage
    }
)
);