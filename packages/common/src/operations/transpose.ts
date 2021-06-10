/**
 * Takes the transpose of a matrix.
 * All rows of the matrix must have the same number of columns.
 */
 export const transpose = (m: (number | undefined)[][]) => {
  const numRows = m.length;
  const numCols = m[0].length;

  const result: (number | undefined)[][] = [];
  for (let i = 0; i < numCols; i++) {
    result[i] = []
    for (let j = 0; j < numRows; j++) {
      result[i][j] = m[j][i];
    }
  }

  return result;
}