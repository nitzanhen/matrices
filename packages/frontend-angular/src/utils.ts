
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

export function* generateIndices(...maxIndices: number[]): Generator<number[]> {
  if (maxIndices.length === 0) {
    yield [];
    return;
  }

  const [headIndex, ...otherIndices] = maxIndices;
  const headRange = rangeGenerator(0, headIndex);
  for (const coord of headRange) {
    for (const coords of generateIndices(...otherIndices)) {
      yield [coord, ...coords]
    }
  }
}