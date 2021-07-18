import { multiplyMatrices } from 'operations'
import { DimensionError, EmptyCellError, Result } from 'Result'
import { Matrix } from 'types'

type ProductResult = Result<Matrix, EmptyCellError | DimensionError>

describe('operations/multiplyMatrices.ts', () => {
  test('Matrix multiplication - valid matrices', () => {
    expect(multiplyMatrices(
      [[1, 2], [3, 4]],
      [[1, 2], [3, 4]],
    ))
      .toEqual<ProductResult>({
        ok: true,
        value: [
          [7, 10],
          [15, 22]
        ]
      });

    expect(multiplyMatrices(
      [[5, -3, 2, 4], [1, 4, 9, -2]],
      [[1, -2], [6, 4], [8, 1], [9, 0]]
    ))
      .toEqual<ProductResult>({
        ok: true,
        value: [
          [39, -20],
          [79, 23]
        ]
      });
  });

  test('Matrix multiplication - empty cells', () => {
    const result1 = multiplyMatrices(
      [[1, 2], [null, 4]],
      [[1, 2], [3, 4]],
    )
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(EmptyCellError)

    const result2 = multiplyMatrices(
      [[5, -3, 2, 4], [1, 4, 9, -2]],
      [[1, -2], [6, 4], [8, 1], [9, null]]
    )
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(EmptyCellError)
  });

  test('Matrix multiplication - non-matching dimensions', () => {
    const result1 = multiplyMatrices(
      [[1, 2]],
      [[1]]
    );
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(DimensionError);

    const result2 = multiplyMatrices(
      [[1, 2], [1, 2]],
      [[1, 2, 3]]
    );
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(DimensionError);
  });
})