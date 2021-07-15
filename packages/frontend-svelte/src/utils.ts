export const stringifyStyles = (styles: Record<string, string>) =>
  Object.entries(styles)
    .map(([key, style]) => `${key}: ${style}`)
    .join(';');

/**
 * A generator of numbers, from `start` to `end`, with `step` difference
 * between elements.
 * `start` is yielded as long as it is less than `end`. `end` is not yielded.
 */
export function* rangeGenerator(start: number, end: number, step = 1) {
  let next = start;
  while (next < end) {
    yield next;
    next += step;
  }
}

/**
 * Generates an array of numbers from `start` to `end`, with `step` difference
 * between elements.
 * `start` is included as long as it is less than `end`. `end` is not included.
 */
export const range = (start: number, end: number, step = 1) =>
  Array.from(rangeGenerator(start, end, step));
