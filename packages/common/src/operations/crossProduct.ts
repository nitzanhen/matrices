import { DimensionError, EmptyCellError, err, ok, Result } from '../Result';
import { Vector } from '../types';

/**
 * Returns the cross product of two vectors.
 * Performance is `O(1)`.
 * 
 * `u` and `v` must be 3-tuples.
 */
export const crossProduct = (u: Vector, v: Vector): Result<[number, number, number], DimensionError | EmptyCellError> => {
  if (u.length !== 3 || v.length !== 3) {
    return err(new DimensionError('u and v must both be vectors of order 3'));
  }
  if (u.includes(undefined) || v.includes(undefined)) {
    return err(new EmptyCellError());
  }
  const [u1, u2, u3] = u as number[];
  const [v1, v2, v3] = v as number[];

  const product: [number, number, number] = [u2 * v3 - u3 * v2, u3 * v1 - u1 * v3, u1 * v2 - u2 * v1]
  return ok(product);
};
