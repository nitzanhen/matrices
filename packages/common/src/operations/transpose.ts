import { EmptyCellError, err, ok, Result } from '../Result';
import { Matrix } from '../types';

/**
 * Takes the transpose of a matrix.
 * All rows of the matrix must have the same number of columns.
 */
 export const transpose = (m: Matrix): Result<Matrix, EmptyCellError> => {
  const numRows = m.length;
  const numCols = m[0].length;

  const result: Matrix = [];
  for (let i = 0; i < numCols; i++) {
    result[i] = []
    for (let j = 0; j < numRows; j++) {
      const mji = m[j][i] ?? null;
      if(mji === null) {
        return err(new EmptyCellError());
      }
      result[i][j] = mji;
    }
  }

  return ok(result);
}