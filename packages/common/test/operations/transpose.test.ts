
import { transpose } from 'operations';
import { EmptyCellError, Result } from 'Result'
import { Matrix } from 'types';

type ProductResult = Result<Matrix, EmptyCellError>

describe('operations/transpose.ts', () => {
  test('Transpose - valid matrices', () => {
    expect(transpose(
      [[1, 2, 3]],
    ))
      .toEqual<ProductResult>({
        ok: true,
        result: [[1], [2], [3]]
      });

    expect(transpose(
      [[1, 2, 3], [4, 5, 6]]
    ))
      .toEqual<ProductResult>({
        ok: true,
        result: [[1, 4], [2, 5], [3, 6]]
      });
  });

  test('Transpose - empty cells', () => {
    const result1 = transpose(
      [[1, 2, undefined]],
    )
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(EmptyCellError)

    const result2 = transpose(
      [[1, 2, undefined], [4, 5, 6]]
    )
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(EmptyCellError)
  });
})