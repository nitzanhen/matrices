import { DimensionError, EmptyCellError, err, ok, Result } from '../Result';
import { Matrix } from '../types';

/**
 * Checks that the two matrices can be multiplied, and returns their product if it's defined.
 * If undefined, the function returns `null`.
 * All rows must have the same amount of columns.
 */
export const multiplyMatrices = (
  m1: Matrix,
  m2: Matrix
): Result<Matrix, DimensionError | EmptyCellError> => {
  const cols1 = m1[0].length;
  const rows2 = m2.length;
  if (cols1 !== rows2) {
    return err(new DimensionError("m2's number of rows must be equal to m1's numbers of columns."));
  }

  const m = cols1; //= rows2
  //Let m1 be of order k x m
  const k = m1.length;
  //Let m2 be of order m x n
  const n = m2[0].length;

  const result: Matrix = [];

  for (let i = 0; i < k; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      let cij = 0;
      for (let l = 0; l < m; l++) {
        const ail = m1[i][l];
        const blj = m2[l][j];
        if (ail === null || blj === null) {
          return err(new EmptyCellError());
        }
        cij += ail * blj;
      }
      result[i][j] = cij;
    }
  }

  return ok(result);
};
