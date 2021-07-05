import React, { HTMLProps, memo } from 'react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { CellValue } from '@matrices/common';

import { BaseComponentProps } from '../types';

const useStyles = createUseStyles({
  cell: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'var(--background-light)',
    borderRadius: 10,

    '&:focus-within': {
      outline: '1px solid var(--color-light, #3d7bcc)'
    }
  },
  cellResult: {
    backgroundColor: 'var(--background-result)',

    '& $input, & $label': {
      color: 'var(--color-result)'
    }
  },
  input: {
    background: 'none',
    textAlign: 'center',
    flex: '1 1 auto',
    maxWidth: 'calc(100% - 16px)',
    height: 'calc(100% - 16px)',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: 18,

    '&:focus': {
      outline: 'none'
    },
    '&:disabled': {
      background: 'none'
    }
  },
  label: {
    position: 'absolute',
    top: 4,
    left: 4,
    color: 'var(--color-primary)',
    opacity: 0.75,
    fontSize: 12
  }
});

export interface CellProps extends BaseComponentProps {
  value: CellValue;
  onChange?: (value: CellValue) => void;
  readonly?: boolean;
  label?: string;
  inputProps?: HTMLProps<HTMLInputElement>;
}

/**
 * A simple cell; typically used as part of a Matrix, even if it contains only a single cell.
 */
export const Cell: React.VFC<CellProps> = memo(function Cell({ className, style, value, onChange, label, readonly = false, inputProps }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onChange?.(undefined);
      return;
    }
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onChange?.(value);
    }
  };

  const classes = useStyles();

  return (
    <div className={clsx(classes.cell, readonly && classes.cellResult, className)} style={style}>
      {label && <span className={classes.label}>{label}</span>}
      <input
        disabled={readonly}
        value={value ?? ''}
        onInput={handleChange}
        className={classes.input}
        {...inputProps}
      />
    </div>
  );
}
);
