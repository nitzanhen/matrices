
import { dotProduct } from 'operations';
import { DimensionError, EmptyCellError, Result } from 'Result'

type ProductResult = Result<number, EmptyCellError | DimensionError>

describe('operations/dotProduct.ts', () => {
  test('Dot product - valid matrices', () => {
    expect(dotProduct(
      [1, 2, 3],
      [1, 2, 3],
    ))
      .toEqual<ProductResult>({
        ok: true,
        value: 14
      });

    expect(dotProduct(
      [1, 2, 3],
      [4, 5, 6],
    ))
      .toEqual<ProductResult>({
        ok: true,
        value: 32
      });
  });

  test('Dot product - empty cells', () => {
    const result1 = dotProduct(
      [null, 2, 3],
      [1, 2, 3],
    )
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(EmptyCellError)

    const result2 = dotProduct(
      [1, 2, null],
      [4, null, 6],
    )
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(EmptyCellError)
  });

  test('Dot product - non-matching dimensions', () => {
    const result1 = dotProduct(
      [1, 2],
      [1, 2, 3],
    );
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(DimensionError);

    const result2 = dotProduct(
      [1, 2, 3],
      [1, 2, 3, 5],
    );
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(DimensionError);
  });
})