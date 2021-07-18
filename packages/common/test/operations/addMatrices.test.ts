import { addMatrices } from 'operations'
import { DimensionError, EmptyCellError, Result } from 'Result'
import { Matrix } from 'types'

type SumResult = Result<Matrix, EmptyCellError | DimensionError>

describe('operations/addMatrices.ts', () => {
  test('Matrix addition - valid matrices', () => {
    expect(addMatrices(
      [[1, 2], [3, 4]],
      [[1, 2], [3, 4]],
    ))
      .toEqual<SumResult>({
        ok: true,
        value: [
          [2, 4],
          [6, 8]
        ]
      });

    expect(addMatrices(
      [[5, -3, 2, 4], [1, 4, 9, -2]],
      [[1, 6, 8, 9], [-2, 4, 1, 0]],
    ))
      .toEqual<SumResult>({
        ok: true,
        value: [
          [6, 3, 10, 13],
          [-1, 8, 10, -2]
        ]
      });
  });

  test('Matrix addition - empty cells', () => {
    const result1 = addMatrices(
      [[1, 2], [null, 4]],
      [[1, 2], [3, 4]],
    )
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(EmptyCellError)

    const result2 = addMatrices(
      [[5, -3, 2, 4], [1, 4, 9, -2]],
      [[1, 6, null, 9], [-2, 4, 1, 0]],
    )
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(EmptyCellError)
  });

  test('Matrix addition - non-matching dimensions', () => {
    const result1 = addMatrices(
      [[1, 2]],
      [[1]]
    );
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(DimensionError);

    const result2 = addMatrices(
      [[1, 2], [1, 2]],
      [[1, 2]]
    );
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(DimensionError);
  });
})