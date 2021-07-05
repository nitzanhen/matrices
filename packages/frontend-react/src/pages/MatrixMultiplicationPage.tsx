import React, { useEffect } from 'react';
import { multiplyMatrices } from '@matrices/common';

import { Equal } from '../components/svg/Equal';
import { Multiply } from '../components/svg/Multiply';
import { Matrix } from '../matrix/Matrix';
import { useMatrix } from '../matrix/useMatrix';

import { OperationPage } from './OperationPage';

/**
 * The page in which matrices can be multiplied, rendered in path /matrix/product.
 */
export const MatrixMultiplicationPage: React.VFC = () => {
  const matrix1 = useMatrix({ label: 'A' });
  const matrix2 = useMatrix({ label: 'B' });
  const product = useMatrix({ label: 'AB', readonly: true, unresizable: true });

  const { setCells: setProductCells, clear: clearProduct } = product;
  useEffect(() => {
    const result = multiplyMatrices(matrix1.cells, matrix2.cells);
    if (result.ok) {
      setProductCells(result.result);
    } else {
      clearProduct();
    }
  }, [matrix1.cells, matrix2.cells, setProductCells, clearProduct]);

  return (
    <OperationPage title="Matrix multiplication">
      <Matrix {...matrix1.toProps()} />
      <Multiply />
      <Matrix {...matrix2.toProps()} />
      <Equal />
      <Matrix {...product.toProps()} />
    </OperationPage>
  );
};
