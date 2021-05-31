import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Matrix } from "../matrix/Matrix";
import { useMatrix } from "../matrix/useMatrix";
import { addMatrices } from "../operations";

const useStyles = createUseStyles(
  {
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      display: "flex",
      "& > *:not(:last-child)": {
        marginRight: 32,
      },
    },
  },
  { name: "matrix-sum" }
);

/**
 * The page in which matrices can be summed up, rendered in path /matrix/add.
 */
export const MatrixAdditionPage: React.VFC = () => {
  const matrix1 = useMatrix();
  const matrix2 = useMatrix();
  const sum = useMatrix(true);

  useEffect(() => {
    const result = addMatrices(matrix1.cells, matrix2.cells);
    if (result) {
      sum.setCells(result);
    } else {
      sum.clear();
    }
  }, [matrix1.cells, matrix2.cells, sum.setCells, sum.clear]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Matrix {...matrix1.toProps()} />
        <Matrix {...matrix2.toProps()} />
        <Matrix {...sum.toProps()} />
      </div>
    </div>
  );
};
