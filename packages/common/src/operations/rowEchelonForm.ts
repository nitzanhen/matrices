import { DimensionError, EmptyCellError, err, ok, Result } from '../Result';
import { Matrix } from '../types';

/**
 * Swaps two rows of the given matrix `m`, at indices `i` and `j`.
 * Swapping is done **in-place**, meaning the original matrix `m` is mutated.
 * Performace is `O(1)`.
 *
 * @returns A Result object containing either `m` with the rows swapped, or an error.
 */
export const swapRows = (m: Matrix, i: number, j: number): Result<Matrix, RangeError> => {
  const numRows = m.length;
  if (i < 0 || j < 0 || i >= numRows || j >= numRows) {
    return err(
      new RangeError(
        `i, j must both be valid row indices, i.e. between 0 and ${
          numRows - 1
        } (inclusive). Received i=${i}, j=${j}`
      )
    );
  }

  const rowI = m[i];
  m[i] = m[j];
  m[j] = rowI;

  return ok(m);
};

/**
 * Multiplies a row of `m` at index `i` by the given `scalar`.
 * The `allowZero` parameter, when set to `true`, will allow `scalar` to be 0. It is `false` by default.
 *
 * Change is done **in-place**, meaning the original matrix `m` is mutated.
 * Performace is `O(k)`, where `k` is the *number of columns* in the matrix.
 *
 * @returns A Result object containing either `m` with the rows multipled, or an error.
 */
export const multiplyRowByScalar = (
  m: Matrix,
  i: number,
  scalar: number,
  allowZero = false
): Result<Matrix, RangeError | EmptyCellError> => {
  const numRows = m.length;
  if (i < 0 || i >= numRows) {
    return err(
      new RangeError(
        `i must be a valid row index, i.e. between 0 and ${
          numRows - 1
        } (inclusive). Received i=${i}`
      )
    );
  }
  if (!allowZero && scalar === 0) {
    return err(
      new RangeError('scalar must not be zero when allowZero=false (this is the default behaviour)')
    );
  }

  if (m[i].includes(null)) {
    return err(new EmptyCellError());
  }
  m[i] = (m[i] as number[]).map(x => scalar * x);

  return ok(m);
};

/**
 * Adds the row at index `j`, multiplied by `scalar`, to the row at index `i`.
 * Addition and scalar multiplication are done element-wise.
 * Change is done **in-place**, meaning the original matrix `m` is mutated.
 * Performace is `O(k)`, where `k` is the *number of columns* in the matrix.
 *
 * @returns A Result object containing either `m` with the rows multipled, or an error.
 */
export const addRowMultiplied = (
  m: Matrix,
  i: number,
  j: number,
  scalar: number
): Result<Matrix, EmptyCellError | RangeError> => {
  const numRows = m.length;
  if (i < 0 || i >= numRows || j < 0 || j >= numRows) {
    return err(
      new RangeError(
        `i and j must be a valid row index, i.e. between 0 and ${
          numRows - 1
        } (inclusive). Received i=${i}, j=${j}`
      )
    );
  }

  if (m[i].includes(null)) {
    return err(new EmptyCellError());
  }
  if (m[j].includes(null)) {
    return err(new EmptyCellError());
  }
  m[i] = (m[i] as number[]).map((x, k) => x + scalar * (m[j][k] as number));

  return ok(m);
};

/**
 * Returns the the entry with the greatest value in the array.
 * fields, which point to the index of the maximum value in the array, and the value itself.
 * If there are multiple indices holding the same max value, returns the first occurence.
 *
 * Entries are passed as [index, value] tuples, and the result is returned accordingly.
 */
export const maxWithIndex = (entries: [index: number, value: number][]) =>
  entries.reduce(
    ([indexMax, max], [index, n]) => (n > max ? [index, n] : [indexMax, max]),
    [-Infinity, -1]
  );

/**
 * An extended version of the row reduction algorithm for calculating the row-echelon form of a matrix,
 * in which a sign - denoting the parity of the number of row swaps - is also returned.
 * This number is used for determinant calculations, as swapping rows in a matrix flips the sign of its determinant.
 *
 * For more info, {@link rowEchelonForm}
 */
export const rowEchelonFormWithSign = (
  m: Matrix
): Result<[echelonForm: number[][], sign: number], DimensionError | EmptyCellError> => {
  const numRows = m.length;
  const numColumns = m[0].length;
  if (m.some(row => row.length !== numColumns)) {
    return err(new DimensionError());
  }

  if (m.some(row => row.includes(null))) {
    return err(new EmptyCellError());
  }

  //Clone m, so as to not modify the original.
  const echelonForm = m.map(row => [...row]) as number[][];

  let pivotRowIndex = 0;
  let pivotColumnIndex = 0;
  let numSwaps = 0;

  while (pivotRowIndex < numRows && pivotColumnIndex < numColumns) {
    const pivotColumn = echelonForm
      .map((row, i) => [i, row[pivotColumnIndex]] as [number, number])
      .slice(pivotColumnIndex);
    const [pivotColumnMaxIndex, pivotColumnMax] = maxWithIndex(pivotColumn);

    if (pivotColumnMax === 0) {
      //No pivots in this column, pass to the next column.
      pivotColumnIndex++;
      continue;
    }

    //Swap rows such that the maximum pivot is on top.
    if (pivotRowIndex !== pivotColumnMaxIndex) {
      swapRows(echelonForm, pivotRowIndex, pivotColumnMaxIndex);
      numSwaps++;
    }

    for (let index = pivotRowIndex + 1; index < numRows; index++) {
      const ratio =
        echelonForm[index][pivotColumnIndex] / echelonForm[pivotRowIndex][pivotColumnIndex];

      //Multiply the current row by pivotRow times -ratio, so as to cancel the leading (pivot) coefficient.
      addRowMultiplied(echelonForm, index, pivotRowIndex, -ratio);
    }

    //Advance to next pivot row and column
    pivotRowIndex++;
    pivotColumnIndex++;
  }

  const swapSign = numSwaps % 2 === 0 ? 1 : -1;
  return ok([echelonForm, swapSign]);
};

rowEchelonFormWithSign([
  [1, 5],
  [3, 2]
]);

/**
 * Returns the row echelon form of the given matrix `m`.
 *
 * This function *does not* modify the original matrix.
 *
 * Performance is `O(n²k)`, where `m` has `k` rows and `n` columns.
 *
 * Based on the algorithm presented at {@link https://en.wikipedia.org/wiki/Gaussian_elimination}
 */
export const rowEchelonForm = (m: Matrix): Result<number[][], DimensionError | EmptyCellError> => {
  const result = rowEchelonFormWithSign(m);
  if (!result.ok) {
    return result;
  }

  return ok(result.result[0]);
};
