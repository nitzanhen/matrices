import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";
import { Route, Switch } from "react-router";
import { TopBar } from "./components/TopBar";
import { WelcomePage } from "./components/WelcomePage";

const useStyles = createUseStyles(
  {
    colorDefs: {
      "--background-primary": "#3A3768",
      "--color-primary": "#3F3C72",
    },

    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",

      "& > main": {
        flex: "1 0 auto",
      },
      color: 'var(--color-primary)'
    },
  },
  { name: "app" }
);

function App() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, classes.colorDefs)}>
      <TopBar />
      <main>
        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
