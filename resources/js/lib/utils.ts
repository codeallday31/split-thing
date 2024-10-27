import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function to get string width considering UTF-8
function getStringWidth(str: string): number {
    return [...str].length;
}

// Helper function to truncate string considering UTF-8
function truncateString(str: string, length: number): string {
    return [...str].slice(0, length).join('');
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// export function conditionalClass(...inputs: ClassValue[]) {
//     return clsx(
//         'bg-blue-500',
//         condition && 'text-white',
//         condition && 'font-bold',
//     );
// }

export function stringLimit(
    value: string,
    limit: number = 100,
    end: string = '...',
    preserveWords: boolean = false,
): string {
    // If the string is shorter than the limit, return it as is
    if (getStringWidth(value) <= limit) {
        return value;
    }

    // If we don't need to preserve words, simply truncate
    if (!preserveWords) {
        return truncateString(value.trim(), limit) + end;
    }

    // Remove HTML tags and normalize whitespace
    value = value
        .replace(/<[^>]*>/g, '') // strip_tags equivalent
        .replace(/[\n\r]+/g, ' ') // normalize line breaks
        .trim();

    const truncated = truncateString(value, limit).trim();

    // Check if the character at the limit position is a space
    if (value.charAt(limit) === ' ') {
        return truncated + end;
    }

    // Find the last complete word
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace === -1) {
        return truncated + end;
    }

    return truncated.substring(0, lastSpace) + end;
}
