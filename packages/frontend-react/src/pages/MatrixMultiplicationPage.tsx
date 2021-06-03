import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Equal } from "../components/svg/Equal";
import { Multiply } from "../components/svg/Multiply";
import { Matrix } from "../matrix/Matrix";
import { useMatrix } from "../matrix/useMatrix";
import { multiplyMatrices } from "../operations";

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
        marginRight: 40,
      },

      "& > svg": {
        alignSelf: 'center',
        width: 48,
        height: 48,
        fill: "var(--color-light)",
      },
    },
  },
  { name: "matrix-sum" }
);

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

  const classes = useStyles();

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
