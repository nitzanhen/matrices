
import { determinant } from 'operations';
import { DimensionError, EmptyCellError } from 'Result'

describe('operations/determinant.ts', () => {
  test('Determinant - valid matrices', () => {
    const result1 = determinant([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])
    expect(result1.ok).toBe(true);
    //@ts-expect-error
    expect(result1.value).toBeCloseTo(0);

    const result2 = determinant([
      [1, 5],
      [3, 2]
    ])
    expect(result2.ok).toBe(true);
    //@ts-expect-error
    expect(result2.value).toBeCloseTo(-13);
  });

  test('Determinant - empty cells', () => {
    const result1 = determinant([
      [1, 2, 3],
      [4, null, 6],
      [7, 8, 9]
    ])
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(EmptyCellError)

    const result2 = determinant([
      [1, null],
      [3, 2]
    ])
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(EmptyCellError)
  });

  test('Determinant - non-matching dimensions', () => {
    const result1 = determinant([
      [1, 2, 3, 4],
      [4, 5, 6],
      [7, 8, 9]
    ]);
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(DimensionError);

    const result2 = determinant([
      [1, 2, 3],
      [1, 2, 3]
    ]);
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(DimensionError);
  });
})