import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function isBase64Image(imageData: string): boolean {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDateString(dateString: string) {
  const dateObj = new Date(dateString);
  const formattedDate = dateObj.toLocaleDateString([], {
    year: "numeric", month: "short", day: "numeric"
  });
  const timeStamp = dateObj.toLocaleTimeString([], {
    hour: "numeric", minute: "2-digit"
  });
  return `${timeStamp} - ${formattedDate}`;
}

export function formatThreadCount(count: number): string {
  if (count === 0) return "No Threads";
  const threadCount = count.toString().padStart(2, "0");
  return `${threadCount} Thread${count === 1 ? "" : "s"}`;
}
