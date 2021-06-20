import { DimensionError, EmptyCellError, err, ok, Result } from '../Result';
import { Matrix } from '../types';

/**
 * Checks that the two matrices can be summed, and returns their sum if it's defined.
 * If undefined, the function returns `null`.
 * All rows must have the same amount of columns.
 */
export const addMatrices = (
  m1: Matrix,
  m2: Matrix
): Result<Matrix, DimensionError | EmptyCellError> => {
  if (m1.length !== m2.length) {
    return err(new DimensionError('m1 and m2 must have the same number of rows'));
  } else if (m1[0].length !== m2[0].length) {
    return err(new DimensionError('m1 and m2 must have the same number of columns'));
  }

  const numRows = m1.length;
  const numColumns = m1[0].length;

  const result: Matrix = [];

  for (let i = 0; i < numRows; i++) {
    result[i] = [];
    for (let j = 0; j < numColumns; j++) {
      const aij = m1[i][j] ?? null;
      const bij = m2[i][j] ?? null;
      if (aij === null || bij === null) {
        return err(new EmptyCellError());
      }
      result[i][j] = aij + bij;
    }
  }

  return ok(result);
};
