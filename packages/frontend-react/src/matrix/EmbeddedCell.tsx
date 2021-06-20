import React from 'react';

import { Cell, CellProps } from './Cell';

export interface EmbeddedCellProps extends CellProps {
  row: number;
  column: number;
  setFocus?: (row: number, column: number) => void;
}

/**
 * A wrapper around {@link Cell} which adds the required logic for it to be used
 * in a matrix or vector.
 */
export const EmbeddedCell: React.VFC<EmbeddedCellProps> = ({
  setFocus,
  row,
  column,
  value,
  inputProps,
  ...otherProps
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement;

    switch (e.key) {
      case 'ArrowLeft': {
        if (el.selectionStart === 0) {
          e.preventDefault();
          e.stopPropagation();
          setFocus?.(row, column - 1);
        }
        break;
      }
      case 'ArrowRight': {
        if (!value || el.selectionStart === String(value).length) {
          e.preventDefault();
          e.stopPropagation();
          return setFocus?.(row, column + 1);
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        e.stopPropagation();
        setFocus?.(row - 1, column);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        e.stopPropagation();
        setFocus?.(row + 1, column);
        break;
      }
    }
  };

  return (
    <Cell value={value} {...otherProps} inputProps={{ ...inputProps, onKeyDown: handleKeyDown }} />
  );
};
