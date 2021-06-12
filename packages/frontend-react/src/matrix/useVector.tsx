import { generateVector, Vector } from '@matrices/common'
import { useCallback, useMemo } from 'react'
import { Rhax, take } from 'rhax';
import { MatrixProps } from './Matrix';
import { useMatrix, useMatrixProps } from './useMatrix'

export interface useVectorProps {
  label?: useMatrixProps['label'],
  readonly?: useMatrixProps['readonly'],
  defaultCells?: Vector
}

/**
 * Wrapper for `useMatrix` to support vectors.
 */
export const useVector = ({
  label,
  readonly = false,
  defaultCells = generateVector(3, () => undefined)
}: useVectorProps) => {
  const defaultMatrixCells = useMemo(() => [defaultCells], [defaultCells]);

  const {
    cells: matrixCells,
    setCells: setMatrixCells,
    addColumn,
    addRow,
    setCell: setMatrixCell,
    clear,
    setFocus: setMatrixFocus,
    gridRef,
    toProps: toMatrixProps
  } = useMatrix({ label, readonly, defaultCells: defaultMatrixCells });

  const cells = useMemo(() => matrixCells[0], [matrixCells]);
  const setCells = useCallback(
    (cells: Vector) => setMatrixCells([cells])
    , [setMatrixCells])

  const setCell = useCallback(
    (i: number, value: number | undefined) =>
      setMatrixCell(i, 1, value),
    [setMatrixCell]
  )

  const setFocus = useCallback(
    (i: number) => setMatrixFocus(i, 1),
    [setMatrixFocus]
  )

  /** @todo `toProps` */

  /** @todo file a bug on this */
  type a = MatrixProps extends Record<string, unknown> ? true : false

  return {
    label,
    readonly,
    cells,
    setCells,
    setCell,
    addColumn,
    addRow,
    clear,
    setFocus,
    gridRef,
  }
}