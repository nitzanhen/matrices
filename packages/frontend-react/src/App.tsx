import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Route, Switch } from 'react-router-dom';

import { TopBar } from './components/TopBar';
import { MatrixAdditionPage } from './pages/MatrixAdditionPage';
import { MatrixDeterminantPage } from './pages/MatrixDeterminantPage';
import { MatrixMultiplicationPage } from './pages/MatrixMultiplicationPage';
import { MatrixTransposePage } from './pages/MatrixTransposePage';
import { WelcomePage } from './pages/WelcomePage';

const useStyles = createUseStyles(
  {
    colorDefs: {
      '--background-light': '#F0EFFF',
      '--background-dark': '#3A3768',
      '--background-result': '#3A3768CD',
      '--color-primary': '#3F3C72',
      '--color-light': '#6C63FF',
      '--color-result': '#F0EFFF'
    },

    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',

      '& > main': {
        flex: '1 0 auto'
      },
      color: 'var(--color-primary)'
    }
  },
  { name: 'app' }
);

function App() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, classes.colorDefs)}>
      <TopBar />
      <main>
        <Switch>
          <Route path='/' exact>
            <WelcomePage />
          </Route>
          <Route path='/matrix/sum'>
            <MatrixAdditionPage />
          </Route>
          <Route path='/matrix/product'>
            <MatrixMultiplicationPage />
          </Route>
          <Route path='/matrix/transpose'>
            <MatrixTransposePage />
          </Route>
          <Route path='/matrix/determinant'>
            <MatrixDeterminantPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
