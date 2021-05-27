
/**
 * Creates a matrix (2d-array) with the given number of rows and columns.
 * Fills all cells in the matrix with `undefined`
 * @param rows the number of rows.
 * @param columns the number of columns.
 */
export const emptyMatrix = (rows: number, columns: number) => {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(
      Array(columns).fill(undefined)
    )
  }
  return matrix;
}

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