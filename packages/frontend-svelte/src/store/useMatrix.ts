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
  defaultCells = generateMatrix(2, 2, () => undefined)
}: useMatrixProps = {}) => {
  const cells = writable(defaultCells);

  const dimensions = derived(cells, cells => [cells.length, cells[0].length] as [number, number]);

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
      if (focusedElement) {
        const focusPosition = cells!.indexOf(focusedElement.parentElement!);
        const focusColumn = focusPosition % numColumns;
        if (focusColumn === j && input) {
          // Iff the focus is not changed horizontally:
          // Set the caret position in the element to be focused equal to the current caret position
          // (this is expected behaviour), then focus it.
          const caretPosition = focusedElement.selectionStart;

          input.type = 'text';
          input.setSelectionRange(caretPosition, caretPosition);
          input.type = 'number';
        }

        input?.focus();
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
