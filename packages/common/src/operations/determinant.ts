

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
