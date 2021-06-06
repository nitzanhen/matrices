import React, { useEffect } from "react";
import { Equal } from "../components/svg/Equal";
import { Multiply } from "../components/svg/Multiply";
import { Matrix } from "../matrix/Matrix";
import { useMatrix } from "../matrix/useMatrix";
import { multiplyMatrices } from "../operations";
import classes from './operation.module.css';

/**
 * The page in which matrices can be multiplied, rendered in path /matrix/product.
 */
export const MatrixMultiplicationPage: React.VFC = () => {
  const matrix1 = useMatrix({ label: "A" });
  const matrix2 = useMatrix({ label: "B" });
  const product = useMatrix({ label: "AB", readonly: true });

  useEffect(() => {
    const result = multiplyMatrices(matrix1.cells, matrix2.cells);
    if (result) {
      product.setCells(result);
    } else {
      product.clear();
    }
  }, [matrix1.cells, matrix2.cells, product.setCells, product.clear]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Matrix {...matrix1.toProps()} />
        <Multiply />
        <Matrix {...matrix2.toProps()} />
        <Equal />
        <Matrix {...product.toProps()} />
      </div>
    </div>
  );
};
