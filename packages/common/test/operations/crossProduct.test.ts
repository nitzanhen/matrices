
import { crossProduct } from 'operations';
import { DimensionError, EmptyCellError, Result } from 'Result'

type ProductResult = Result<[number, number, number], EmptyCellError | DimensionError>

describe('operations/crossProduct.ts', () => {
  test('Cross product - valid matrices', () => {
    expect(crossProduct(
      [1, 2, 3],
      [1, 2, 3],
    ))
      .toEqual<ProductResult>({
        ok: true,
        value: [0, 0, 0]
      });

      expect(crossProduct(
        [1, 2, 3],
        [4, 5, 6],
      ))
        .toEqual<ProductResult>({
          ok: true,
          value: [-3, 6, -3]
        });
  });

  test('Cross product - empty cells', () => {
    const result1 = crossProduct(
      [null, 2, 3],
      [1, 2, 3],
    )
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(EmptyCellError)

    const result2 = crossProduct(
      [1, 2, null],
      [4, null, 6],
    )
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(EmptyCellError)
  });

  test('Cross product - non-matching dimensions', () => {
    const result1 = crossProduct(
      [1, 2],
      [1, 2, 3],
    );
    expect(result1.ok).toBe(false);
    //@ts-expect-error
    expect(result1.err).toBeInstanceOf(DimensionError);

    const result2 = crossProduct(
      [1, 2, 3, 5],
      [1, 2, 3, 5],
    );
    expect(result2.ok).toBe(false);
    //@ts-expect-error
    expect(result2.err).toBeInstanceOf(DimensionError);
  });
})