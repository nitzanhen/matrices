<script lang="ts">
  import { link } from 'svelte-navigator';
import Github from './svg/Github.svelte';

  export let page: string;
</script>

<div class="root">
  <span class="text">
    <h1>
      <a href="/" use:link>Coolest Matrices</a>
    </h1>
    {#if !!page}
      <span>/</span>
      <span>{page}</span>
    {/if}
  </span>
  <a href="https://github.com/NitzanHen/matrices">
    <Github />
  </a>
</div>

<style>
  .root {
    background-color: var(--background-dark);
    color: white;
    padding: 16px;
    box-shadow: 0px 3px 9px 0px #00000050;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .text > h1 {
    display: inline;
  }

  .text > :not(h1) {
    font-size: 22;
    letter-spacing: 2; 
  }

  .text > :not(:last-child) {
    margin-right: 8px;
  }

 
</style>
