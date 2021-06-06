import { useCallback, useRef, useState } from "react";
import { MatrixProps } from "./Matrix";
import { generateMatrix } from "../utils";

interface useMatrixProps {
  label?: string;
  readonly?: boolean;
  defaultCells?: (number | undefined)[][];
}

/**
 * Handles functionality for a single matrix.
 */
export const useMatrix = ({
  label,
  readonly = false,
  defaultCells = generateMatrix(2, 2, () => undefined),
}: useMatrixProps) => {
  const [cells, setCells] = useState<(number | undefined)[][]>(defaultCells);

  // Assumption: all rows have the same amount of values.
  const numRows = cells.length;
  const numColumns = cells[0].length;

  const addColumn = useCallback(() => {
    setCells((cells) => cells.map((row) => [...row, undefined]));
  }, []);

  const removeColumn = useCallback(() => {
    setCells((cells) => {
      const numColumns = cells[0].length;
      return numColumns > 1 ? cells.map((row) => row.slice(0, -1)) : cells;
    });
  }, []);

  const addRow = useCallback(() => {
    setCells((cells) => [...cells, Array(cells[0].length).fill(undefined)]);
  }, []);

  const removeRow = useCallback(() => {
    setCells((cells) => {
      const numRows = cells.length;
      return numRows > 1 ? cells.slice(0, -1) : cells;
    });
  }, []);

  const setCell = useCallback(
    (row: number, column: number, value: number | undefined) => {
      setCells((cells) => {
        const newCells = cells.map((row) => [...row]);
        newCells[row][column] = value;

        return newCells;
      });
    },
    []
  );

  const clear = useCallback(() => {
    setCells(generateMatrix(numRows, numColumns, () => undefined));
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
      const input = cells?.[position]?.querySelector("input") as
        | HTMLInputElement
        | undefined;

      const focusedElement = el?.querySelector("*:focus") as
        | HTMLInputElement
        | undefined;
      if (focusedElement) {
        const focusPosition = cells!.indexOf(focusedElement.parentElement!);
        const focusColumn = focusPosition % numColumns;
        if (focusColumn === j) {
          // Iff the focus is not changed horizontally:
          // Set the caret position in the element to be focused equal to the current caret position
          // (this is expected behaviour), then focus it.
          const caretPosition = focusedElement.selectionStart;
          input?.setSelectionRange(caretPosition, caretPosition);
        }

        input?.focus();
      }
    },
    [gridRef.current, numRows, numColumns]
  );

  const toProps = useCallback(
    (): MatrixProps => ({
      label,
      cells,
      onAddColumn: addColumn,
      onRemoveColumn: removeColumn,
      onAddRow: addRow,
      onRemoveRow: removeRow,
      onChange: setCell,
      setFocus,
      gridRef,
      readonly,
    }),
    [cells, addColumn, addRow, setCell, readonly, label]
  );

  return {
    label,
    cells,
    addColumn,
    removeColumn,
    addRow,
    removeRow,
    setCell,
    setCells,
    clear,
    gridRef,
    setFocus,
    readonly,
    toProps,
  };
};
