import { DimensionError, err, ok, Result } from '../Result';
import { Matrix } from '../types';
import { rowEchelonForm } from './rowEchelonForm';

/**
 * Calculates the determinant of a sqaure matrix `m`.
 * Performance is O(n³).
 * 
 * `m` must be a matrix of order `n` by `n`, where `n` is a positive integer.
 */
export const determinant = (m: Matrix): Result<number, DimensionError> => {
  const n = m.length;
  if (n <= 0 || m[0].length !== n) {
    return err(new DimensionError('Matrix must be of order n by n, where n is a positive integer.'))
  }
  const result = rowEchelonForm(m);
  if (!result.ok) {
    return result;
  }

  const { result: echelonForm } = result;

  const determinant = [...Array(n).keys()]
    .map(i => echelonForm[i][i])
    .reduce((product, x) => product * x, 1)
  return ok(determinant);
}

// const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
// const testMatrix = [...Array(500).keys()].map(() => [...Array(500).keys()].map(() => randomInt(1, 15)))
// console.log(testMatrix);
// const startTime = window.performance.now();
// console.log(determinant(testMatrix));
// const endTime = window.performance.now();
// console.log(`operation took ${endTime - startTime} nanoseconds`)