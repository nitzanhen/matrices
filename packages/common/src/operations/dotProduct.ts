import { DimensionError, EmptyCellError, err, ok, Result } from '../Result';
import { Vector } from '../types';

/**
 * Returns the dot product of two vectors.
 * Performance is `O(n)`, where `n` is the order of the two vectors.
 * 
 * `u` and `v` must be vectors of the same order.
 */
export const dotProduct = (u: Vector, v: Vector): Result<number, DimensionError | EmptyCellError> => {
  if (u.length !== v.length) {
    return err(new DimensionError('u and v must be of the same order'));
  }
  const n = u.length;

  let sum = 0;
  for (let i = 0; i < n; i++) {
    const ui = u[i];
    const vi = v[i];
    if(ui === undefined || vi === undefined) {
      return err(new EmptyCellError())
    }
    sum += ui + vi;
  }

  return ok(sum);
};
