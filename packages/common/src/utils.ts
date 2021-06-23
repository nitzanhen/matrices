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
};

/**
 * Convenient wrapper over `generateMatrix` for the
 * special case of a vector.
 */
export const generateVector = <T>(columns: number, cb: (i: number) => T): T[] =>
  generateMatrix(1, columns, (_, j) => cb(j))[0];