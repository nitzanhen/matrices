import React, { memo } from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { BaseComponentProps } from "../types";

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
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  readonly?: boolean;
  label?: string;
}

/**
 * A simple cell; can be part of a vector or matrix or stand by itself.
 */
const Cell: React.VFC<CellProps> = memo(
  ({ className, style, value, onChange, label, readonly = false }) => {
    /** @todo fix logic. */
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        onChange(undefined);
        return;
      }
      const value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        onChange(value);
      }
    };

    const classes = useStyles();

    return (
      <div
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
          type="number"
          value={value ?? ""}
          onInput={onChangeHandler}
          className={classes.input}
          onKeyDown={(e) => {
            console.log((e.target as any));
          }}
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    const keys = new Set([
      ...Object.keys(prevProps),
      ...Object.keys(nextProps),
    ]);
    keys.delete("onChange");

    type Prop = keyof typeof prevProps;

    for (const key of keys) {
      if (prevProps[key as Prop] !== nextProps[key as Prop]) {
        return false;
      }
    }

    return prevProps.onChange.toString() === nextProps.onChange.toString();
  }
);

export default Cell;
