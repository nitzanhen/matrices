import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Equal } from "../components/svg/Equal";
import { Plus } from "../components/svg/Plus";
import { Matrix } from "../matrix/Matrix";
import { useMatrix } from "../matrix/useMatrix";
import { addMatrices } from "../operations";
import classes from './operation.module.css';

/**
 * The page in which matrices can be summed up, rendered in path /matrix/sum.
 */
export const MatrixAdditionPage: React.VFC = () => {
  const matrix1 = useMatrix({ label: "A" });
  const matrix2 = useMatrix({ label: "B" });
  const sum = useMatrix({ label: "A+B", readonly: true });

  useEffect(() => {
    const result = addMatrices(matrix1.cells, matrix2.cells);
    if (result) {
      sum.setCells(result);
    } else {
      sum.clear();
    }
  }, [matrix1.cells, matrix2.cells, sum.setCells, sum.clear]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Matrix {...matrix1.toProps()} />
        <Plus />
        <Matrix {...matrix2.toProps()} />
        <Equal />
        <Matrix {...sum.toProps()} />
      </div>
    </div>
  );
};
