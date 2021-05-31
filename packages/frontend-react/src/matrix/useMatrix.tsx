import { useCallback, useRef, useState } from "react";
import { MatrixProps } from "./Matrix";
import { generateMatrix } from "../utils";

/**
 * Handles functionality for a single matrix.
 */
export const useMatrix = (
  defaultCells = generateMatrix(3, 3, () => undefined)
) => {
  const [cells, setCells] = useState<(number | undefined)[][]>(defaultCells);

  const addColumn = useCallback(() => {
    setCells((cells) => cells.map((row) => [...row, undefined]));
  }, []);

  // Assumption: all rows have the same amount of values.
  const numRows = cells.length;
  const numColumns = cells[0].length;

  const addRow = useCallback(() => {
    setCells((cells) => {
      const numColumns = cells[0].length;
      return [...cells, Array(numColumns).fill(undefined)];
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
      cells,
      onAddColumn: addColumn,
      onAddRow: addRow,
      onChange: setCell,
      setFocus,
      gridRef,
    }),
    [cells, addColumn, addRow, setCell]
  );

  return {
    cells,
    addColumn,
    addRow,
    setCell,
    gridRef,
    setFocus,
    toProps,
  };
};
