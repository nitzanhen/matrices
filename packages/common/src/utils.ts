
/**
 * Creates a matrix (2d-array) with the given number of rows and columns.
 * Populates each cell with the value retrieved from the callback.
 * @param rows the number of rows.
 * @param columns the number of columns.
 * @param cb the callback to populate by
 */
export const generateMatrix = <T>(
  rows: number,
  columns: number,
  cb: (i: number, j: number) => T
): T[][] => {
  const matrix: T[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = cb(i, j);
    }
  }
  return matrix;
}

/**
 * Convenient wrapper over `generateMatrix` for the
 * special case of a vector.
 */
export const generateVector = <T>(
  columns: number,
  cb: (i: number) => T
): T[] => generateMatrix(1, columns, (i) => cb(i))[0];

export const bisect = <T>(target: Iterable<T>, predicate: (item: T) => boolean): [T[], T[]] => {
  const bisected = [[], []] as [T[], T[]];
  for (const item of target) {
    const index = predicate(item) ? 0 : 1
    bisected[index].push(item);
  }

  return bisected;
};

export const union = <T>(...iterables: Iterable<T>[]): Set<T> => {
  const set = new Set<T>();
  iterables.forEach(iter => {
    for (const item of iter) {
      set.add(item);
    }
  });

  return set;
}