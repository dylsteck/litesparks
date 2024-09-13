import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const LITESPARKS_API = "";
export const EMPTY_USER_PFP = "https://i.imgur.com/sosbyP2.png";
export const ZORA_CLIENT_API = "https://zora.co/api";
export const ZORA_BACKEND_API = "https://api.zora.co";