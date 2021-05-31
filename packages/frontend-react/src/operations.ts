
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

/**
 * Checks that the two matrices can be multiplied, and returns their product if it's defined.
 * If undefined, the function returns `null`.
 * All rows must have the same amount of columns.
 */
export const multiplyMatrices = (m1: (number | undefined)[][], m2: (number | undefined)[][]) => {
  const cols1 = m1[0].length;
  const rows2 = m2.length;
  if (cols1 !== rows2) {
    return null;
  }

  const m = cols1 //= rows2
  //Let m1 be of order k x m
  const k = m1.length
  //Let m2 be of order m x n
  const n = m2[0].length

  const result: (number | undefined)[][] = [];

  for (let i = 0; i < k; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      let cij = 0;
      for (let l = 0; l < m; l++) {
        const ail = m1[i][l] ?? null;
        const blj = m2[l][j] ?? null;
        if (ail === null || blj === null) {
          return null;
        }

        console.log(ail, blj, ail + blj)
        cij += ail * blj;
      }
      console.log('!')
      result[i][j] = cij;
    }
  }

  return result;
};

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

export const dotProduct = (u: [...number[]], v: [...number[]]) => {
  if (u.length !== v.length) {
    return null;
  }
  const n = u.length;

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += u[i] * v[i];
  }

  return sum;
}

export const crossProduct = (u: [number, number, number], v: [number, number, number]) => {
  const [u1, u2, u3] = u;
  const [v1, v2, v3] = v;

  return [u2 * v3 - u3 * v2, u3 * v1 - u1 * v3, u1 * v2 - u2 * v1];
}