
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