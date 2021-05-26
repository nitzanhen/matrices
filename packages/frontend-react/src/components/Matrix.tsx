import React from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { BaseComponentProps } from "../types";
import Cell from "./Cell";

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

interface MatrixProps extends BaseComponentProps {
  matrix: (number | undefined)[][];
  onChange: (row: number, column: number, value: number | undefined) => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  readonly?: boolean;
}

const Matrix: React.VFC<MatrixProps> = ({
  matrix,
  readonly = false,
  onChange,
  onAddRow,
  onAddColumn,
  className,
  style,
}) => {
  const [numRows, numColumns] = [matrix.length, matrix[0].length];

  const classes = useStyles({ numRows, numColumns });

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.matrix} style={style}>
        {matrix.flatMap((row, i) =>
          row.map((value, j) => (
            <Cell
              className={classes.cell}
              key={`(${i},${j})`}
              label={`(${i},${j})`}
              value={value}
              onChange={(value) => onChange(i, j, value)}
              readonly={readonly}
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
};

export default Matrix;
