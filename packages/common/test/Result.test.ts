import { ok, err, Result } from 'Result';

describe('Result.ts', () => {
  test('ok()', () => {
    expect(ok(3)).toEqual<Result<number>>({ ok: true, result: 3 });
    expect(ok([])).toEqual<Result<unknown[]>>({ ok: true, result: [] });
  })

  test('err()', () => {
    expect(err(3)).toEqual<Result<unknown, number>>({ ok: false, err: 3 });
    expect(err(new Error())).toEqual<Result<unknown, Error>>({ ok: false, err: new Error() });
  })
})