import React from "react";
import { createUseStyles } from "react-jss";
import calculator from "../calculator.svg";
import { Link } from "../components/Link";

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
      marginTop: 40,
      width: '100%',
      overflow: 'hidden',
      display: "flex",

      "& > span": {
        display: "block",
        width: 1,
        flex: "0 0 auto",
        backgroundColor: "var(--background-dark)",
        opacity: 0.3,
        margin: "0 24px",
      },

      "& > div": {
        flex: "1 1 50%",
        display: "grid",
        padding: 8,
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        columnGap: 16,
        rowGap: 16,
      },
    },
  },
  { name: "welcome" }
);

/**
 * A welcome page; this is rendered at the root path, and prompts
 * the user to select the operation they'd like to calculate.
 */
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
            <Link to='/matrix/sum'>Matrix addition</Link>
            <Link to='/matrix/product'>Matrix multiplication</Link>
            <Link to='/matrix/transpose'>Matrix transpose</Link>
            <Link to='/matrix/determinant'>Matrix determinant</Link>
          </div>
          <span />
          <div>
            <Link to='/vector/dot'>Dot product</Link>
            <Link to='/vector/cross'>Cross product</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
