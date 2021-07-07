
export function generateMatrix<T>(rows: number, columns: number, cb: (i: number, j: number) => T): T[][];
export function generateMatrix(rows: number, columns: number): null[][];
/**
 * Creates a matrix (2d-array) with the given number of rows and columns.
 * Populates each cell with the value retrieved from the callback.
 * @param rows the number of rows.
 * @param columns the number of columns.
 * @param cb the callback to populate by. If `cb` is not specified, all cells will be filled with null.
 */
export function generateMatrix<T = null>(
  rows: number,
  columns: number,
  cb?: (i: number, j: number) => T
): T[][] {
  // The cast on the default value is ok, since if cb is not specified, 
  // T is not specified, and therefore defaults to null.
  const fn = cb ?? (() => null) as unknown as () => T;

  const matrix: T[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = fn(i, j);
    }
  }
  return matrix;
};


/**
 * Convenient wrapper over `generateMatrix` for the
 * special case of a vector.
 */
export function generateVector<T>(columns: number, cb?: (i: number) => T): T[];
export function generateVector(columns: number): null[]
export function generateVector<T>(columns: number, cb?: (i: number) => T): T[] {
  // The cast on the default value is ok, since if cb is not specified, 
  // T is not specified, and therefore defaults to null.
  return cb ? generateMatrix(1, columns, (_, j) => cb(j))[0] : generateMatrix(1, columns)[0] as unknown as T[];
}