import React, { forwardRef, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import { CellValue, generateMatrix, Matrix as MathMatrix } from '@matrices/common';

import { BaseComponentProps } from '../types';
import { Cell } from './Cell';
import { Plus } from '../components/svg/Plus';
import { Minus } from '../components/svg/Minus';
import { EmbeddedCell } from './EmbeddedCell';

interface MatrixDimensions {
  numRows: number;
  numColumns: number;
}

const useStyles = createUseStyles(
  {
    root: {
      width: 'max-content',
      height: 'max-content',
      display: 'grid',
      gridTemplateAreas: `
        "label ."
        "matrix add-col"
        "add-row ."
      `,
      rowGap: 16,
      columnGap: 16,
      alignItems: 'center',
      justifyContent: 'center',
      gridTemplateRows: '1fr auto',
      gridTemplateColumns: '1fr auto',

      '& button': {
        appearance: 'none',
        border: 'none',
        background: 'none',
        padding: 0,
        margin: 0,
        borderRadius: '50%',
        boxShadow: '0 2px 3px 1px #00000029'
      },

      '& svg': {
        margin: 0,
        padding: 0,
        width: 24,
        height: 24,
        fill: 'var(--color-primary)',
        verticalAlign: 'top'
      }
    },
    addCol: {
      gridArea: 'add-col',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',

      '& > :not(:last-child)': {
        marginBottom: 16
      }
    },

    addRow: {
      gridArea: 'add-row',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '& > :not(:last-child)': {
        marginRight: 16
      }
    },

    matrix: ({ numRows, numColumns }: MatrixDimensions) => ({
      gridArea: 'matrix',
      display: 'grid',
      gridTemplateRows: `repeat(${numRows}, 100px)`,
      gridTemplateColumns: `repeat(${numColumns}, 100px)`,
      rowGap: 8,
      columnGap: 8,

      '& > $cell': {
        width: '100%',
        height: '100%'
      }
    }),
    cell: {},
    label: {
      gridArea: 'label',
      textAlign: 'center',
      fontSize: 28,
      color: 'var(--color-primary)'
    }
  },
  { name: 'matrix' }
);

export interface MatrixProps extends BaseComponentProps {
  cells: MathMatrix;
  onChange: (row: number, column: number, value: CellValue) => void;
  onAddRow: () => void;
  onRemoveRow: () => void;
  onAddColumn: () => void;
  onRemoveColumn: () => void;
  setFocus: (row: number, column: number) => void;
  readonly?: boolean;
  gridRef?: React.Ref<HTMLDivElement>;
  label?: ReactNode;
}

/**
 * A matrix - i.e. a grid of cells.
 * The intended use for this component is with the `useMatrix` hook.
 */
export const Matrix: React.VFC<MatrixProps> = ({
  cells,
  readonly = false,
  onChange,
  onAddRow,
  onRemoveRow,
  onAddColumn,
  onRemoveColumn,
  setFocus,
  className,
  style,
  gridRef,
  label
}) => {
  const [numRows, numColumns] = [cells.length, cells[0].length];

  const onChangeHandlers = useMemo(
    () =>
      generateMatrix(numRows, numColumns, (i, j) => (value: CellValue) => onChange(i, j, value)),
    [numRows, numColumns, onChange]
  );

  const classes = useStyles({ numRows, numColumns });

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.label}>{label}</div>
      <div className={classes.matrix} style={style} ref={gridRef}>
        {cells.flatMap((row, i) =>
          row.map((value, j) => (
            <EmbeddedCell
              className={classes.cell}
              row={i}
              column={j}
              key={`(${i},${j})`}
              label={`(${i},${j})`}
              value={value}
              onChange={onChangeHandlers[i][j]}
              readonly={readonly}
              setFocus={setFocus}
            />
          ))
        )}
      </div>
      {!readonly && (
        <>
          <div className={classes.addCol}>
            <button onClick={onRemoveColumn}>
              <Minus />
            </button>
            <button onClick={onAddColumn}>
              <Plus />
            </button>
          </div>
          <div className={classes.addRow}>
            <button onClick={onRemoveRow}>
              <Minus />
            </button>
            <span>{numRows} rows</span>
            <button onClick={onAddRow}>
              <Plus />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
