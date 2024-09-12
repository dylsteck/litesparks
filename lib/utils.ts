import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const LITESPARKS_API = "http://localhost:3000";
// export const LITESPARKS_API = "https://litesparks.xyz";
export const SKELETON_PFP_URL = "https://i.imgur.com/cey3rmT.png";
export const ZORA_CLIENT_API = "https://zora.co/api";
export const ZORA_BACKEND_API = "https://api.zora.co";