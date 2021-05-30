import React, { memo, useRef } from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { BaseComponentProps } from "../types";
import { take } from "rhax";
import { bisect, union } from "../utils";

const useStyles = createUseStyles({
  cell: {
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    border: "1px solid black",
    borderRadius: 4,
    transition: "border-color 200ms ease-in-out",

    "&:focus-within": {
      border: "2px solid #3d7bcc",
    },
  },
  cellDisabled: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  input: {
    textAlign: "center",
    flex: "1 1 auto",
    maxWidth: "calc(100% - 16px)",
    height: "calc(100% - 16px)",
    border: "none",

    "&:focus": {
      outline: "none",
    },
    "&:disabled": {
      background: "none",
    },
  },
  label: {
    position: "absolute",
    top: 4,
    left: 4,
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 12,
  },
});

interface CellProps extends BaseComponentProps {
  row: number;
  column: number;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  readonly?: boolean;
  label?: string;
  setFocus?: (row: number, column: number) => void;
}

/**
 * A simple cell; can be part of a vector or matrix or stand by itself.
 */
const Cell: React.VFC<CellProps> = memo(
  ({
    row,
    column,
    className,
    style,
    value,
    onChange,
    label,
    readonly = false,
    setFocus,
  }) => {
    /** @todo fix logic. */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        onChange(undefined);
        return;
      }
      const value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        onChange(value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const el = e.target as HTMLInputElement;

      switch (e.key) {
        case "ArrowLeft": {
          if (el.selectionStart === 0) {
            e.preventDefault();
            e.stopPropagation();
            setFocus?.(row, column - 1);
          }
          break;
        }
        case "ArrowRight": {
          if (!value || el.selectionStart === String(value).length) {
            e.preventDefault();
            e.stopPropagation();
            return setFocus?.(row, column + 1);
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          e.stopPropagation();
          setFocus?.(row - 1, column);
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          e.stopPropagation();
          setFocus?.(row + 1, column);
          break;
        }
      }
    };

    const ref = useRef<HTMLInputElement | null>(null);
    console.log(ref.current?.selectionStart);

    const classes = useStyles();

    return (
      <div
        ref={ref}
        className={clsx(
          classes.cell,
          readonly && classes.cellDisabled,
          className
        )}
        style={style}
      >
        {label && <span className={classes.label}>{label}</span>}
        <input
          disabled={readonly}
          value={value ?? ""}
          onInput={handleChange}
          className={classes.input}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    type Prop = keyof typeof prevProps;

    const keys = union(Object.keys(prevProps), Object.keys(nextProps));
    const [functionKeys, nonFunctionKeys] = bisect(
      keys,
      (key) =>
        typeof prevProps[key as Prop] === "function" ||
        typeof nextProps[key as Prop] === "function"
    );

    for (const key of nonFunctionKeys) {
      if (prevProps[key as Prop] !== nextProps[key as Prop]) {
        return false;
      }
    }

    for (const key of functionKeys) {
      if (
        prevProps[key as Prop]?.toString() !==
        nextProps[key as Prop]?.toString()
      ) {
        return false;
      }
    }

    return true;
  }
);

export default Cell;
