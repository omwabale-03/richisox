"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "@/types";

export interface CartItem {
  product: IProduct;
  quantity: number;
  size: string;
  color: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: IProduct, size: string, color: string, qty?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, color, qty = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product._id === product._id && i.size === size && i.color === color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product._id === product._id && i.size === size && i.color === color
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: qty, size, color }] };
        });
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product._id === productId && i.size === size && i.color === color)
          ),
        }));
      },

      updateQty: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product._id === productId && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      subtotal: () => {
        return get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      },

      itemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    { name: "richysox-cart" }
  )
);
