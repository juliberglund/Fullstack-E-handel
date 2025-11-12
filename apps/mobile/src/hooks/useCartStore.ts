import { create } from "zustand";
import type { Product } from "shared/types/product";

export type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) => {
    const existing = get().items.find((p) => p.id === item.id);
    if (existing) {
      set({
        items: get().items.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },
  removeFromCart: (id) =>
    set({ items: get().items.filter((p) => p.id !== id) }),
  clearCart: () => set({ items: [] }),
  get total() {
    return get().items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  },
}));
