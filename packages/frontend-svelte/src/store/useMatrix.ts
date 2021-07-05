import { derived, writable } from 'svelte/store';
import { generateMatrix, Matrix, CellValue } from '@matrices/common';

export interface useMatrixProps {
  label?: string //MatrixProps['label'];
  readonly?: boolean //MatrixProps['readonly'];
  unresizable?: boolean //MatrixProps['unresizable'];
  defaultCells?: Matrix;
}

export const useMatrix = ({
  label,
  readonly = false,
  unresizable = false,
  defaultCells = generateMatrix(2, 2, () => undefined)
}: useMatrixProps) => {
  const cells = writable(defaultCells);

  const setCell = (row: number, column: number, value: CellValue) =>
    cells.update(cells => {
      const newCells = cells.map(row => [...row]);
      newCells[row][column] = value;

      return newCells;
    });

  const setNumRows = (numRows: number) =>
    cells.update(cells => generateMatrix(
      numRows,
      cells[0].length,
      (i, j) => cells[i]?.[j] ?? undefined
    ));


  const setNumColumns = (numColumns: number) =>
    cells.update(cells => generateMatrix(
      cells.length,
      numColumns,
      (i, j) => cells[i]?.[j] ?? undefined
    ));


  const clear = () =>
    cells.update(cells => generateMatrix(cells.length, cells[0].length, () => undefined));

  const props = derived(cells, () => ({
    label,
    cells,
    onChange: setCell,
    onNumRowsChanged: setNumRows,
    onNumColumnsChanged: setNumColumns,
    readonly,
    unresizable
  }))

  return {
    label,
    cells,
    setCell,
    setNumRows,
    setNumColumns,
    clear,
    readonly,
    unresizable,
    props
  }
}
