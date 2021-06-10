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