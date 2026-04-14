"use client";

const KEY = "richysox-recent-searches";
const MAX = 5;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentSearch(term: string): void {
  if (!term.trim()) return;
  const recent = getRecentSearches();
  const updated = [term.trim(), ...recent.filter((s) => s !== term.trim())].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function clearRecentSearches(): void {
  localStorage.removeItem(KEY);
}
