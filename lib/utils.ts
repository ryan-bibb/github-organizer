import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysOpen(date: string): boolean {
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  return Date.now() - new Date(date).getTime() > THIRTY_DAYS_MS;
}

export function getPriority(title: string): number {
  const match = title.match(/\bP([1-3])\b/);
  return match ? Number(match[1]) : null;
}
