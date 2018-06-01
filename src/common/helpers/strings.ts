export function truncate(str: string, len: number): string {
    typeof str !== 'string' && return undefined;
    return str.length + 3 > len
        ? str.slice(0, len - 3) + '...'
        : str;
}
