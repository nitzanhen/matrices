<script lang="ts">
  import { link } from 'svelte-routing';

  export let to: string;

  export let style: string;
</script>

<a use:link href={to} class="link" {style}>
  <slot />
</a>

<style>
  .link {
    cursor: pointer;
    border: none;
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 4px;
    text-decoration: none;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    background-color: var(--background-light);
    color: var(--color-primary);
  }
</style>
