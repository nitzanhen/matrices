<script lang="ts">
  import HomeLink from '../components/HomeLink.svelte';
import Cell from '../components/matrix/Cell.svelte';
</script>

<div class="root">
  <div class="content">
    <img src="calculator.svg" alt="Home art" />
    <h1>Welcome!</h1>
    <p>select an operation to get started</p>
    <div class="actions">
      <h2>Matrix</h2>
      <span />
      <h2>Vector</h2>

      <div>
        <HomeLink to="/matrix/sum" style="max-width: 120px;">Matrix addition</HomeLink>
        <HomeLink to="/matrix/product" style="max-width: 120px;">Matrix multiplication</HomeLink>
        <HomeLink to="/matrix/transpose" style="max-width: 120px;">Matrix transpose</HomeLink>
        <HomeLink to="/matrix/determinant" style="max-width: 120px;">Matrix determinant</HomeLink>
      </div>
      <span class="divider" />
      <div>
        <HomeLink to="/vector/dot" style="max-width: 120px;">Dot product</HomeLink>
        <HomeLink to="/vector/cross" style="max-width: 120px;">Cross product</HomeLink>
      </div>
      <Cell>
        <span slot="label">(0, 0)</span>
      </Cell>
    </div>
  </div>
</div>

<style>
  .root {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .content > img {
    max-width: 40vh;
    max-height: 40vh;
  }

  .actions {
    width: 100%;
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr auto 1fr;
    row-gap: 16px;
    column-gap: 16px;
    margin-top: 40px;
  }

  .actions > div {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
    column-gap: 16px;
    padding: 8px;
  }

  .divider {
    width: 1px;
    display: block;
    flex: 0 0 auto;
    background-color: var(--background-dark);
    opacity: 0.3;
  }
</style>
