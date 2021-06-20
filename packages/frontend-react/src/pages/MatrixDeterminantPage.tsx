import { CellValue, determinant } from '@matrices/common';
import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Equal } from '../components/svg/Equal';
import { RightArrow } from '../components/svg/RightArrow';
import { Cell } from '../matrix/Cell';
import { Matrix } from '../matrix/Matrix';
import { useMatrix } from '../matrix/useMatrix'
import { OperationPage } from './OperationPage';

const useStyles = createUseStyles({
  cell: {
    alignSelf: 'center'
  }
}, { name: 'determinant-page' })

export const MatrixDeterminantPage: React.VFC = () => {
  const matrix = useMatrix({ label: 'A' });
  const result = useMemo(() => {
    const result = determinant(matrix.cells);
    return result.ok ? result.result : undefined
  }, [matrix.cells])

  const classes = useStyles();

  return (
    <OperationPage>
      <Matrix {...matrix.toProps()} />
      <RightArrow />
      <Cell value={result} readonly className={classes.cell} label='|A|'/>
    </OperationPage>
  )
}