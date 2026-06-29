import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve an asset path against the app's base URL so it works both in local
 * dev ("/") and on GitHub Pages ("/Personal-Website/"). Leaves absolute URLs
 * and data URIs untouched.
 */
export function withBaseUrl(path?: string): string | undefined {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
