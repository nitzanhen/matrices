
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

// This actually gives the cartesian product, not permutations
// function* permutationsOf<T>(...iterables: Iterable<T>[]): Generator<[T[], number[]]> {
//   if (iterables.length === 0) {
//     yield [[], []];
//     return;
//   }

//   let itemIndex = 0;
//   const [head, ...nextIters] = iterables;
//   for (const item of head) {
//     for (const [items, coords] of permutationsOf(...nextIters)) {
//       yield [[item, ...items], [itemIndex, ...coords]];
//     }
//     itemIndex++;
//   }
// }

function* permutationsOf<T>(items: T[]): Generator<[...T[]]> {
  if (items.length === 0) {
    yield [];
    return;
  }

  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    const others = items.slice()
    others.splice(index, 1);

    for (const perm of permutationsOf(others)) {
      yield [item, ...perm];
    }
  }
};

/**
 * Returns the sign of a permutation.
 * This function does not check that the input is valid, i.e. it assumes
 * that `permutation` contains the numbers 0, ..., n-1, where n is the length
 * of the array (and each integer appears exactly once).
 * n is also assumed to be positive.
 * 
 * This function breaks the permutation up into cycles, which is not as straighforward
 * as counting inversions, but provides roughly O(n) time instead of O(n^2).
 */
const signOf = (permutation: [...number[]]): -1 | 1 => {
  //The pool of "available" numbers. When this is depleted, the job is done.
  let pool = [...permutation];
  const cycles: Set<number>[] = [];
  let cycle: Set<number>;

  while (pool.length > 0) {
    cycle = new Set();
    cycles.push(cycle);

    let nextNum = pool[0];
    while (!cycle.has(nextNum)) {
      cycle.add(nextNum);
      nextNum = permutation[nextNum];
    }

    //Omit all elements of the cycle from our pool
    pool = pool.filter(n => !cycle.has(n));
  }

  const sum = cycles.map(c => c.size - 1).reduce((sum, n) => sum + n, 0);
  return sum % 2 === 0 ? 1 : -1;
}

console.log(signOf([2, 3, 4, 1, 0]), signOf([2, 3, 0, 1]))

/**
 * Calculates the determinant of a matrix.
 * `m` must be a square matrix.
 */
export const determinant = (matrix: (number | undefined)[][]) => {
  //Laplace expansion along the first row

  const n = matrix.length;

  let det = 0;
  //Iterate over all permutations over rows of m
  for (const permutation of permutationsOf([...Array(n).keys()])) {
    const sign = signOf(permutation);
    let product = 1;
    for (let i = 0; i < n; i++) {
      const j = permutation[i];
      const aij = matrix[i][j];
      if (aij === undefined) {
        return null;
      }
      product *= aij;
    }
    det += sign * product
  }

  return det;
}

//console.log(determinant([[1, 3, 5, 9], [1, 3, 1, 7], [4, 3, 9, 7], [5, 2, 0, 9]]))

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