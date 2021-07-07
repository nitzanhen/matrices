<script lang="ts">
  import { Route, useLocation } from 'svelte-navigator';
  import TopBar from './components/TopBar.svelte';
  import MatrixAdditionPage from './pages/MatrixAdditionPage.svelte';
  import MatrixDeterminantPage from './pages/MatrixDeterminantPage.svelte';
  import MatrixProductPage from './pages/MatrixProductPage.svelte';
  import MatrixTransposePage from './pages/MatrixTransposePage.svelte';
  import WelcomePage from './pages/WelcomePage.svelte';
  import DotProductPage from './pages/DotProductPage.svelte';
  import CrossProductPage from './pages/CrossProductPage.svelte';

  const pageNames = {
    '/matrix/sum': 'Matrix Addition',
    '/matrix/product': 'Matrix multiplication',
    '/matrix/transpose': 'Matrix transposition',
    '/matrix/determinant': 'Matrix determinant',
    '/vector/dot': 'Dot product',
    '/vector/cross': 'Cross product'
  };

  const location = useLocation();
  $: pageName = (pageNames as any)[$location.pathname];
</script>

<div class="root">
  <TopBar page={pageName} />
  <main>
    <Route path="/">
      <WelcomePage />
    </Route>
    <Route path="/matrix/sum">
      <MatrixAdditionPage />
    </Route>
    <Route path="/matrix/product">
      <MatrixProductPage />
    </Route>
    <Route path="/matrix/transpose">
      <MatrixTransposePage />
    </Route>
    <Route path="/matrix/determinant">
      <MatrixDeterminantPage />
    </Route>

    <Route path="/vector/dot">
      <DotProductPage />
    </Route>
    <Route path="/vector/cross">
      <CrossProductPage />
    </Route>
  </main>
</div>

<style>
  :root {
    --background-light: #f0efff;
    --background-dark: #3a3768;
    --background-result: #3a3768cd;
    --color-primary: #3f3c72;
    --color-light: #6c63ff;
    --color-result: #f0efff;
  }

  .root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: var(--color-primary);
  }

  .root > main {
    flex: 1 0 auto;
  }
</style>
