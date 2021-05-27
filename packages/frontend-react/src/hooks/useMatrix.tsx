import { useCallback, useRef, useState } from "react";
import { take } from "rhax";
import { MatrixProps } from "../components/Matrix";
import { emptyMatrix } from "../utils";

export const useMatrix = (defaultCells = emptyMatrix(3, 3)) => {
  const [cells, setCells] = useState<(number | undefined)[][]>(defaultCells);

  const addColumn = useCallback(() => {
    setCells((cells) => cells.map((row) => [...row, undefined]));
  }, []);

  // Assumption: all rows have the same amount of values.
  const numRows = cells.length;
  const numColumns = cells[0].length;

  const addRow = useCallback(() => {
    setCells((cells) => {
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
      //const row = take(i).clamp()
      const position = i * numColumns + j; //equivalent to element in pos (i, j) in the grid
      const input = el?.children.item(position)?.querySelector("input") as
        | HTMLInputElement
        | undefined;

      if (el?.querySelector("*:focus")) input?.focus();
    },
    [ref.current]
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
