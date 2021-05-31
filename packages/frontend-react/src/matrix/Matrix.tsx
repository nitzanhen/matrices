import React, { forwardRef, useMemo } from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { BaseComponentProps } from "../types";
import { generateMatrix } from "../utils";
import { Cell } from './Cell';

interface MatrixDimensions {
  numRows: number;
  numColumns: number;
}

const useStyles = createUseStyles(
  {
    root: {
      width: "max-content",
      height: "max-content",
      rowGap: 16,
      columnGap: 16,
      display: "grid",
      gridTemplateAreas: `
        "matrix add-col"
        "add-row ."
      `,
      gridTemplateRows: "1fr auto",
      gridTemplateColumns: "1fr auto",
    },
    matrix: ({ numRows, numColumns }: MatrixDimensions) => ({
      gridArea: "matrix",
      display: "grid",
      gridTemplateRows: `repeat(${numRows}, 100px)`,
      gridTemplateColumns: `repeat(${numColumns}, 100px)`,

      "& > $cell": {
        width: "100%",
        height: "100%",
      },
    }),
    cell: {},
  },
  { name: "matrix" }
);

export interface MatrixProps extends BaseComponentProps {
  cells: (number | undefined)[][];
  onChange: (row: number, column: number, value: number | undefined) => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  setFocus: (row: number, column: number) => void;
  readonly?: boolean;
}

export const Matrix = forwardRef<HTMLDivElement, MatrixProps>(
  (
    {
      cells,
      readonly = false,
      onChange,
      onAddRow,
      onAddColumn,
      setFocus,
      className,
      style,
    },
    ref
  ) => {
    const [numRows, numColumns] = [cells.length, cells[0].length];

    const onChangeHandlers = useMemo(
      () =>
        generateMatrix(
          numRows,
          numColumns,
          (i, j) => (value: number | undefined) => onChange(i, j, value)
        ),
      [numRows, numColumns, onChange]
    );

    const classes = useStyles({ numRows, numColumns });

    return (
      <div className={clsx(classes.root, className)}>
        <div className={classes.matrix} style={style} ref={ref}>
          {cells.flatMap((row, i) =>
            row.map((value, j) => (
              <Cell
                className={classes.cell}
                row={i}
                column={j}
                key={`(${i},${j})`}
                label={`(${i},${j})`}
                value={value}
                onChange={onChangeHandlers[i][j]}
                readonly={readonly}
                setFocus={setFocus}
              />
            ))
          )}
        </div>
        <button style={{ gridArea: "add-col" }} onClick={onAddColumn}>
          aaaaaaa
        </button>
        <button style={{ gridArea: "add-row" }} onClick={onAddRow}>
          bbbbbbb
        </button>
      </div>
    );
  }
);
