import React, { useEffect } from 'react';
import { addMatrices } from '@matrices/common';

import { Equal } from '../components/svg/Equal';
import { Plus } from '../components/svg/Plus';
import { Matrix } from '../matrix/Matrix';
import { useMatrix } from '../matrix/useMatrix';

import { OperationPage } from './OperationPage';

/**
 * The page in which matrices can be summed up, rendered in path /matrix/sum.
 */
export const MatrixAdditionPage: React.VFC = () => {
  const matrix1 = useMatrix({ label: 'A' });
  const matrix2 = useMatrix({ label: 'B' });
  const sum = useMatrix({ label: 'A+B', readonly: true });

  const { setCells: setSumCells, clear: clearSum } = sum;
  useEffect(() => {
    const result = addMatrices(matrix1.cells, matrix2.cells);
    if (result.ok) {
      setSumCells(result.result);
    } else {
      clearSum();
    }
  }, [matrix1.cells, matrix2.cells, setSumCells, clearSum]);

  return (
    <OperationPage>
      <Matrix {...matrix1.toProps()} />
      <Plus />
      <Matrix {...matrix2.toProps()} />
      <Equal />
      <Matrix {...sum.toProps()} />
    </OperationPage>
  );
};
