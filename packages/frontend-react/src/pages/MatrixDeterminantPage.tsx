import { determinant } from '@matrices/common';
import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { RightArrow } from '../components/svg/RightArrow';
import { Matrix } from '../matrix/Matrix';
import { useMatrix } from '../matrix/useMatrix';

import { OperationPage } from './OperationPage';

const useStyles = createUseStyles(
  {
    cell: {
      alignSelf: 'center'
    }
  },
  { name: 'determinant-page' }
);

export const MatrixDeterminantPage: React.VFC = () => {
  const matrix = useMatrix({ label: 'A' });
  const resultMatrix = useMatrix({
    label: '|A|',
    readonly: true,
    unresizable: true,
    defaultCells: [[null]]
  });

  const { setCells: setResultCells, clear: clearResult } = resultMatrix;
  useEffect(() => {
    const result = determinant(matrix.cells);
    if (result.ok) {
      setResultCells([[result.value]]);
    } else {
      clearResult();
    }
  }, [matrix.cells, setResultCells, clearResult]);

  const classes = useStyles();

  return (
    <OperationPage>
      <Matrix {...matrix.toProps()} />
      <RightArrow />
      <Matrix {...resultMatrix.toProps()} className={classes.cell} />
    </OperationPage>
  );
};
