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
