import { generateMatrix, Matrix } from '@matrices/common'
import { ref, computed } from 'vue';

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

  return {
    cells,
    setNumRows,
    setNumColumns,
    clear,
    readonly,
    unresizable,
    gridRef,
  }
};