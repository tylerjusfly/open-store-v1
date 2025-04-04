import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

export const extractSubdomain = (url:string) => {
    // Remove any protocol (e.g., "https://") and trailing slashes
    const domain = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

    // Split the domain into parts
    const parts = domain.split('.');

    // If there are more than two parts, the first part is the subdomain
    if (parts.length > 2) {
        return parts[0]; // Return the subdomain (e.g., "fanshop")
    }

    // If no subdomain exists, return null or an empty string
    return null; // or return '';
}

export const hexToRgba = (hex: string, opacity = 0.6) => {
  // Remove the leading "#" if present
  hex = hex.replace(/^#/, "");

  // If shorthand (e.g., "fff"), convert to full form ("ffffff")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Parse the hex into RGB components
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
  