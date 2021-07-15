import clsx from 'clsx';
import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Route, Switch, useLocation } from 'react-router-dom';

import { TopBar } from './components/TopBar';
import { CrossProductPage } from './pages/CrossProductPage';
import { DotProductPage } from './pages/DotProductPage';
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

  const { pathname } = useLocation();
  const pageName = useMemo(
    () =>
      ({
        '/matrix/sum': 'Matrix Addition',
        '/matrix/product': 'Matrix multiplication',
        '/matrix/transpose': 'Matrix transposition',
        '/matrix/determinant': 'Matrix determinant',
        '/vector/dot': 'Dot product',
        '/vector/cross': 'Cross product'
      }[pathname]),
    [pathname]
  );

  return (
    <div className={clsx(classes.root, classes.colorDefs)}>
      <TopBar page={pageName} />
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

          <Route path='/vector/dot'>
            <DotProductPage />
          </Route>
          <Route path='/vector/cross'>
            <CrossProductPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
