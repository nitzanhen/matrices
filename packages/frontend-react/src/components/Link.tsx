import React from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const useStyles = createUseStyles(
  {
    root: {
      cursor: "pointer",
      transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      borderRadius: 4,
      border: "none",
      padding: "8px 12px",
      fontSize: 16,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: 'none'
    },
    dark: {
      backgroundColor: "var(--background-dark)",
      color: "white",
    },
    light: {
      backgroundColor: "var(--background-light)",
      color: "var(--color-primary)",
    },
    outline: {
      backgroundColor: "transparent",
      border: "1px solid var(--color-primary)",
      color: "var(--color-primary)",
    },
  },
  { name: "button" }
);

export interface LinkProps extends RouterLinkProps {
  variant?: "dark" | "light" | "outline";
}

/**
 * A styled wrapper for `react-router-dom`'s `Link`.
 */
export const Link: React.VFC<LinkProps> = ({
  className,
  variant = "light",
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <RouterLink
      className={clsx(
        classes.root,
        {
          [classes.dark]: variant === "dark",
          [classes.light]: variant === "light",
          [classes.outline]: variant === "outline",
        },
        className
      )}
      {...otherProps}
    />
  );
};
