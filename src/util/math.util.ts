
/*
 * A method to clamp between two numbers, inclusive.
 */
export function clampInt(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}