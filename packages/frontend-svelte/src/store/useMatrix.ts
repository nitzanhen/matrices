import { derived, writable } from 'svelte/store';
import { generateMatrix, Matrix } from '@matrices/common';

export interface useMatrixProps {
  readonly?: boolean //MatrixProps['readonly'];
  unresizable?: boolean //MatrixProps['unresizable'];
  defaultCells?: Matrix;
}

export const useMatrix = ({
  readonly = false,
  unresizable = false,
  defaultCells = generateMatrix(2, 2)
}: useMatrixProps = {}) => {
  const cells = writable(defaultCells);

  const dimensions = derived(cells, cells => [cells.length, cells[0].length] as [number, number]);

  const setNumRows = (numRows: number) =>
    cells.update(cells => generateMatrix(
      numRows,
      cells[0].length,
      (i, j) => cells[i]?.[j] ?? null
    ));


  const setNumColumns = (numColumns: number) =>
    cells.update(cells => generateMatrix(
      cells.length,
      numColumns,
      (i, j) => cells[i]?.[j] ?? null
    ));


  const clear = () =>
    cells.update(cells => generateMatrix(cells.length, cells[0].length));

  const gridRef = writable<HTMLDivElement | null>(null);

  const setFocus = derived(
    [dimensions, gridRef],
    ([[numRows, numColumns], gridRef]) => (i: number, j: number) => {
      if (i < 0 || j < 0 || i > numRows - 1 || j > numColumns - 1) {
        return;
      }

      const el = gridRef;

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
    })

  const props = derived(setFocus, setFocus => ({
    cells,
    onNumRowsChanged: setNumRows,
    onNumColumnsChanged: setNumColumns,
    readonly,
    unresizable,
    gridRef,
    setFocus
  }));


  return {
    cells,
    setNumRows,
    setNumColumns,
    clear,
    readonly,
    unresizable,
    gridRef,
    setFocus,
    props
  }
}
