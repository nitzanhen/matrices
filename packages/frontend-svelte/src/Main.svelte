<script lang="ts">
  import { Route, useLocation } from 'svelte-navigator';
  import TopBar from './components/TopBar.svelte';
  import WelcomePage from './pages/WelcomePage.svelte';

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
  $: console.log(pageName)
</script>

<div class="root">
  <TopBar page={pageName} />
  <main>
    <Route path="/*">
      <WelcomePage />
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
