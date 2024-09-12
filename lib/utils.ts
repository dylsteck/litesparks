import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const SKELETON_PFP_URL = "https://i.imgur.com/cey3rmT.png";
export const ZORA_CLIENT_API = "https://zora.co/api";
export const ZORA_BACKEND_API = "https://api.zora.co";