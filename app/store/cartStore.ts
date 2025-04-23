import { create } from "zustand";

type CartState = {
  count: number;
  setCount: (count: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
  clearCart: () => set({ count: 0 }),
}));
