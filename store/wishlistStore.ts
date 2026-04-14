"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "@/types";

interface WishlistStore {
  items: IProduct[];
  addItem: (product: IProduct) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: IProduct) => void;
  clearWishlist: () => void;
  itemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((i) => i._id === product._id)) return state;
          return { items: [...state.items, product] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i._id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i._id === productId);
      },

      toggleItem: (product) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(product._id)) {
          removeItem(product._id);
        } else {
          addItem(product);
        }
      },

      clearWishlist: () => set({ items: [] }),

      itemCount: () => get().items.length,
    }),
    { name: "richysox-wishlist" }
  )
);
