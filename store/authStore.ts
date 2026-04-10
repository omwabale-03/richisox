"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/types";

interface AuthStore {
  user: IUser | null;
  token: string | null;
  setAuth: (user: IUser, token: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),

      isLoggedIn: () => !!get().token,

      isAdmin: () => get().user?.role === "admin",
    }),
    { name: "richysox-auth" }
  )
);
