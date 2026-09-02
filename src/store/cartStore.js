import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
persist(
    (set, get) => ({
    items: [],

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

    removeItem: (id) =>
        set((state) => ({
        items: state.items.filter((item) => item.id !== id),
        })),

    clearCart: () => set({ items: [] }),

    getTotal: () => {
        const { items } = get();
        return items.reduce(
          (acc, item) => acc + item.price * item.quantity,
        0
        );
    },

    getTotalItems: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.quantity, 0);
    },

      // Arma el array en el formato exacto que espera la función SQL
      // create_order_with_items (parámetro p_items, tipo jsonb).
    getOrderItems: () => {
        const { items } = get();
        return items.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        unit_price: item.price,
        quantity: item.quantity,
        }));
    },
    }),
    {
    name: "cart-storage",
    }
)
);