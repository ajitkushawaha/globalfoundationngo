import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatInstagramLink(link: string) {
  if (!link.trim()) return ''
  
  // If it's already a full URL, return as is
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link
  }
  
  // If it starts with @, remove it and create URL
  if (link.startsWith('@')) {
    return `https://instagram.com/${link.substring(1)}`
  }
  
  // If it's just a username, create URL
  if (link.startsWith('instagram.com/')) {
    return `https://${link}`
  }
  
  // If it's just a username without @, create URL
  return `https://instagram.com/${link}`
}
