import React from "react";
import { createUseStyles } from "react-jss";
import calculator from "../calculator.svg";

const useStyles = createUseStyles(
  {
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      "& > img": {
        maxHeight: "40vh",
        maxWidth: "40vh",
      },
    },
    actions: {
      marginTop: 32,
      display: "flex",

      "& > span": {
        display: "block",
        width: 1,
        flex: "0 0 auto",
        backgroundColor: "var(--background-primary)",
        opacity: 0.3,
      },

      "& > div": {
        flex: "1 0 50%",
      },
    },
  },
  { name: "welcome" }
);

export const WelcomePage: React.VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <img src={calculator} />
        <h1>Welcome</h1>
        <p>select an operation to get started</p>
        <div className={classes.actions}>
          <div>
            <button>Matrix addition</button>
            <button>Matrix multiplication</button>
            <button>Matrix transpose</button>
            <button>Matrix determinant</button>
          </div>
          <span />
          <div>
            <button>Dot product</button>
            <button>Cross product</button>
          </div>
        </div>
      </div>
    </div>
  );
};
