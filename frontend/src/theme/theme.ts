const KEY = "theme"; // "light" | "dark"
export type Theme = "light" | "dark";

export function getTheme(): Theme {
  const saved = localStorage.getItem(KEY) as Theme | null;
  if (saved) return saved;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return prefersDark ? "dark" : "light";
}
export function applyTheme(th: Theme) {
  const root = document.documentElement;
  if (th === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  localStorage.setItem(KEY, th);
}
export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}
