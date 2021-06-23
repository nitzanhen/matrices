import { generateMatrix, generateVector } from '../src/utils';

describe('utils.test.ts', () => {
  test('generateMatrix', () => {
    expect(generateMatrix(2, 2, (i, j) => i + j)).toEqual([[0, 1], [1, 2]]);
    expect(generateMatrix(3, 2, () => null)).toEqual([[null, null], [null, null], [null, null]]);
    expect(generateMatrix(1, 4, (i, j) => `(${i}, ${j})`)).toEqual([['(0, 0)', '(0, 1)', '(0, 2)', '(0, 3)']]);
  })

  test('generateVector', () => {
    expect(generateVector(2, i => i)).toEqual([0, 1]);
    expect(generateVector(2, () => null)).toEqual([null, null]);
    expect(generateVector(4, (i) => `v[${i}]`)).toEqual(['v[0]', 'v[1]', 'v[2]', 'v[3]']);
  })
});