import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// right now OLD badge is 30 days or older
export function daysOpen(date: string): boolean {
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  return Date.now() - new Date(date).getTime() >= THIRTY_DAYS_MS;
}

export function getPriority(title: string): number | null {
  const match = title.match(/\bP([1-3])\b/);
  return match ? Number(match[1]) : null;
}
