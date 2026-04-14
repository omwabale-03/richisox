"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "@/types";

export interface CartItem {
  product: IProduct;
  quantity: number;
  size: string;
  color: string;
  packSize?: number;
  packPrice?: number;
  giftBox?: {
    items: string[];
    message: string;
    packaging: string;
    packagingPrice: number;
  };
}

interface CartStore {
  items: CartItem[];
  addItem: (product: IProduct, size: string, color: string, qty?: number, packSize?: number, packPrice?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, quantity: number) => void;
  addGiftBox: (item: CartItem) => void;
  clearCart: () => void;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, color, qty = 1, packSize, packPrice) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product._id === product._id && i.size === size && i.color === color && !i.giftBox
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product._id === product._id && i.size === size && i.color === color && !i.giftBox
                  ? { ...i, quantity: i.quantity + qty, packSize: packSize || i.packSize, packPrice: packPrice || i.packPrice }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: qty, size, color, packSize, packPrice }] };
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

      addGiftBox: (item) => {
        set((state) => ({ items: [...state.items, item] }));
      },

      clearCart: () => set({ items: [] }),

      subtotal: () => {
        return get().items.reduce((sum, i) => {
          const price = i.packPrice || i.product.price;
          const packagingPrice = i.giftBox?.packagingPrice || 0;
          return sum + (price * i.quantity) + packagingPrice;
        }, 0);
      },

      itemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    { name: "richysox-cart" }
  )
);
