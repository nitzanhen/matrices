import { useCallback, useRef, useState } from 'react';
import { CellValue, generateMatrix, Matrix } from '@matrices/common';

import { MatrixProps } from './Matrix';

export interface useMatrixProps {
  label?: MatrixProps['label'];
  readonly?: MatrixProps['readonly'];
  unresizable?: MatrixProps['unresizable'];
  defaultCells?: Matrix;
}

/**
 * Handles functionality for a single matrix.
 */
export const useMatrix = ({
  label,
  readonly = false,
  unresizable = false,
  defaultCells = generateMatrix(2, 2, () => null)
}: useMatrixProps) => {
  const [cells, setCells] = useState<Matrix>(defaultCells);

  // Assumption: all rows have the same amount of values.
  const numRows = cells.length;
  const numColumns = cells[0].length;

  const setCell = useCallback((row: number, column: number, value: CellValue) => {
    setCells(cells => {
      const newCells = cells.map(row => [...row]);
      newCells[row][column] = value;

      return newCells;
    });
  }, []);

  const setNumRows = useCallback((numRows: number) => {
    setCells(cells => generateMatrix(
      numRows,
      cells[0].length,
      (i, j) => cells[i]?.[j] ?? null)
    )
  }, []);

  const setNumColumns = useCallback((numColumns: number) => {
    setCells(cells => generateMatrix(
      cells.length,
      numColumns,
      (i, j) => cells[i]?.[j] ?? null)
    )
  }, []);

  const clear = useCallback(() => {
    setCells(generateMatrix(numRows, numColumns, () => null));
  }, [numRows, numColumns]);

  const gridRef = useRef<HTMLDivElement | null>(null);

  const setFocus = useCallback(
    (i: number, j: number) => {
      if (i < 0 || j < 0 || i > numRows - 1 || j > numColumns - 1) {
        return;
      }
      const el = gridRef.current;

      const position = i * numColumns + j; //equivalent to element in pos (i, j) in the grid
      const cells = el ? Array.from(el.children) : null;
      const input = cells?.[position]?.querySelector('input') as HTMLInputElement | undefined;

      const focusedElement = el?.querySelector('*:focus') as HTMLInputElement | undefined;
      if (focusedElement && input) {
        const focusPosition = cells!.indexOf(focusedElement.parentElement!);
        const focusColumn = focusPosition % numColumns;
        if (j > focusColumn) {
          // The focus was moved right; set the caret position to 0 (the leftmost position)
          input.setSelectionRange(0, 0)
        }
        else if (j < focusColumn) {
          //The focus was moved left; set the caret position to the last position of the new input (the rightmost position)
          const maxPosition = input.value.length;
          input.setSelectionRange(maxPosition, maxPosition);
        }
        else { //(j === focusColumn)
          // Iff the focus is not changed horizontally:
          // Set the caret position in the element to be focused equal to the current caret position
          // (this is expected behaviour), then focus it.
          const caretPosition = focusedElement.selectionStart;

          input.setSelectionRange(caretPosition, caretPosition);
        }

        input.focus();
      }
    },
    [numRows, numColumns]
  );

  const toProps = useCallback(
    (): MatrixProps => ({
      label,
      cells,
      onChange: setCell,
      onNumRowsChanged: setNumRows,
      onNumColumnsChanged: setNumColumns,
      setFocus,
      gridRef,
      readonly,
      unresizable
    }),
    [cells, setCell, readonly, label, setFocus, unresizable, setNumRows, setNumColumns]
  );

  return {
    label,
    cells,
    setCell,
    setCells,
    setNumRows,
    setNumColumns,
    clear,
    gridRef,
    setFocus,
    readonly,
    unresizable,
    toProps
  };
};
