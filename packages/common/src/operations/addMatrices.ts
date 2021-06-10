/**
 * Checks that the two matrices can be summed, and returns their sum if it's defined.
 * If undefined, the function returns `null`.
 * All rows must have the same amount of columns.
 */
 export const addMatrices = (m1: (number | undefined)[][], m2: (number | undefined)[][]) => {
  if (m1.length !== m2.length) {
    return null;
  }
  // Assumption: .
  else if (m1[0].length !== m2[0].length) {
    return null;
  }

  const numRows = m1.length;
  const numColumns = m1[0].length;

  const result: (number | undefined)[][] = [];

  for (let i = 0; i < numRows; i++) {
    result[i] = [];
    for (let j = 0; j < numColumns; j++) {
      const aij = m1[i][j] ?? null;
      const bij = m2[i][j] ?? null;
      if (aij === null || bij === null) {
        return null;
      }
      result[i][j] = aij + bij;
    }
  }

  return result;
}