import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Equal } from "../components/svg/Equal";
import { Matrix } from "../matrix/Matrix";
import { useMatrix } from "../matrix/useMatrix";
import { transpose } from "../operations";
import classes from "./operation.module.css";

const useStyles = createUseStyles({
  inputMatrix: {
    alignSelf: "center",
  },
});

/**
 * Page in which the transpose of a matrix can be calulated. Rendered at /matrix/transpose.
 */
export const MatrixTransposePage: React.VFC = () => {
  const matrix = useMatrix({ label: "A" });
  const tranposed = useMatrix({ label: "A+B", readonly: true });

  useEffect(() => {
    const result = transpose(matrix.cells);
    if (result) {
      tranposed.setCells(result);
    } else {
      tranposed.clear();
    }
  }, [matrix.cells, tranposed.setCells, tranposed.clear]);

  const { inputMatrix } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Matrix {...matrix.toProps()} className={inputMatrix} />
        <Equal />
        <Matrix {...tranposed.toProps()} />
      </div>
    </div>
  );
};
