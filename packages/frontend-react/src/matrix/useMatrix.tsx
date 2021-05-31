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

  const ref = useRef<HTMLDivElement | null>(null);

  const setFocus = useCallback(
    (i: number, j: number) => {
      if (i < 0 || j < 0 || i > numRows - 1 || j > numColumns - 1) {
        return;
      }


      const el = ref.current;

      const position = i * numColumns + j; //equivalent to element in pos (i, j) in the grid
      const input = el?.children.item(position)?.querySelector("input") as
        | HTMLInputElement
        | undefined;

      const focusedElement = el?.querySelector("*:focus") as
        | HTMLInputElement
        | undefined;
      if (focusedElement) {
        // Set the caret position in the element to be focused equal to the current caret position
        // (this is expected behaviour), then focus it.
        const caretPosition = focusedElement.selectionStart;
        input?.focus();
        input?.setSelectionRange(caretPosition, caretPosition);
      }
    },
    [ref.current, numRows, numColumns]
  );

  const toProps = useCallback(
    (): MatrixProps => ({
      cells,
      onAddColumn: addColumn,
      onAddRow: addRow,
      onChange: setCell,
      setFocus,
    }),
    [cells, addColumn, addRow, setCell]
  );

  return {
    cells,
    addColumn,
    addRow,
    setCell,
    ref,
    setFocus,
    toProps,
  };
};
