import React, { ReactNode, useCallback, useMemo, FocusEvent } from 'react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import { CellValue, generateMatrix, Matrix as MathMatrix } from '@matrices/common';

import { BaseComponentProps } from '../types';

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
      position: 'relative'
    },

    matrix: ({ numRows, numColumns }: MatrixDimensions) => ({
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
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: 0,
      right: 0,
      zIndex: 100,
      textAlign: 'center',
      fontSize: 28,
      color: 'var(--color-primary)',
      '& > :not(:last-child)': {
        marginRight: 8
      }
    },

    dimensionInput: {
      display: 'inline-block',

      width: '0.8em'
    },

    dimensionsForm: {
      display: 'inline-flex',
      alignItems: 'baseline',
      columnGap: 2
    }
  },
  { name: 'matrix' }
);

export interface MatrixProps extends BaseComponentProps {
  cells: MathMatrix;
  onChange: (row: number, column: number, value: CellValue) => void;
  onNumRowsChanged: (numRows: number) => void,
  onNumColumnsChanged: (numColumns: number) => void,
  setFocus: (row: number, column: number) => void;
  readonly?: boolean;
  unresizable?: boolean;
  gridRef?: React.Ref<HTMLDivElement>;
  label?: ReactNode;
}

/**
 * A matrix - i.e. a grid of cells.
 * The intended use for this component is with the `useMatrix` hook.
 */
export const Matrix: React.VFC<MatrixProps> = ({
  cells,
  unresizable = false,
  readonly = false,
  onChange,
  onNumRowsChanged,
  onNumColumnsChanged,
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

  const handleNumRowsChange = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onNumRowsChanged(value)
    }
  }, [onNumRowsChanged]);

  const handleNumColumnsChange = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onNumColumnsChanged(value)
    }
  }, [onNumColumnsChanged]);

  /** @todo this isnt actually being fired, probably because the form isnt being submitted. */
  const handleDimensionsFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const newNumRows = parseInt(formData.get('num-rows') as string);
    const newNumColumns = parseInt(formData.get('num-columns') as string);

    if(!isNaN(newNumRows) && newNumRows !== numRows) {
      onNumRowsChanged(newNumRows)
    }
    if(!isNaN(newNumColumns) && newNumColumns !== numColumns) {
      onNumColumnsChanged(newNumColumns)
    }
  }, [onNumRowsChanged, onNumColumnsChanged, numRows, numColumns])

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.label}>
        <span>{label}</span>
        {!unresizable && (
          <form className={classes.dimensionsForm} noValidate onSubmit={handleDimensionsFormSubmit}>
            (
            <input
              name='num-rows'
              onBlur={handleNumRowsChange}
              onSubmit={handleNumRowsChange}
              className={classes.dimensionInput}
              defaultValue={numRows}
            />
            x
            <input
              name='num-columns'
              onBlur={handleNumColumnsChange}
              className={classes.dimensionInput}
              defaultValue={numColumns}
            />
            )
          </form>
        )}

      </div>
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
    </div>
  );
};
