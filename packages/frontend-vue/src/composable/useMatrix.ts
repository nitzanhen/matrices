import { generateMatrix, Matrix } from '@matrices/common'
import { computed, ref } from 'vue';

export interface useMatrixProps {
  readonly?: boolean;
  unresizable?: boolean;
  defaultCells?: Matrix
}

/**
 * A special case of `computed` for functions, analogous
 * to React's `useCallback`.
 */
//const callback = <A extends any[], B>(fn: (...args: A) => B) => computed(() => fn)

/**
 * A Vue 3 composable mimicing the functionality provided by the React demo's `useMatrix`.
 */
export const useMatrix = ({
  readonly = false,
  unresizable = false,
  defaultCells = generateMatrix(2, 2)
}: useMatrixProps) => {

  const cells = ref(defaultCells);

  const [numRows, numColumns] = [cells.value.length, cells.value[0].length];

  const setNumRows = (newNumRows: number) => {
    cells.value = generateMatrix(
      newNumRows,
      numColumns,
      (i, j) => cells.value[i]?.[j] ?? null
    )
  };

  const setNumColumns = (newNumColumns: number) => {
    cells.value = generateMatrix(
      numRows,
      newNumColumns,
      (i, j) => cells.value[i]?.[j] ?? null
    )
  };

  const clear = () => {
    cells.value = generateMatrix(numRows, numColumns);
  }

  const gridRef = ref<HTMLDivElement | null>(null);

  const setFocus = (i: number, j: number) => {
    if (i < 0 || j < 0 || i > numRows - 1 || j > numColumns - 1) {
      return;
    }

    const el = gridRef.value;

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
  }

  const props = computed(() => ({
    cells,
    readonly,
    unresizable,
    gridRef,
    setFocus
  }));

  const eventHandlers = computed(() => ({
    numRowsChanged: setNumRows,
    numColumnsChanged: setNumColumns,
  }))

  return {
    cells,
    setNumRows,
    setNumColumns,
    clear,
    setFocus,
    readonly,
    unresizable,
    gridRef,
    props,
    eventHandlers
  }
};