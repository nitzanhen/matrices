<script lang="ts">
  import type { CellValue } from '@matrices/common';
  /**
   * A simple cell; typically used as part of a Matrix, even if it contains only a single cell.
   */
  export let readonly: boolean = false;

  let value: CellValue;
</script>

<div class="cell" class:readonly>
  {#if $$slots.label}
    <span class="label">
      <slot name="label" />
    </span>
  {/if}
  <input bind:value disabled={readonly} type="number" {...$$restProps} />
</div>

<style>
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: var(--background-light);
  }

  input {
    background: none;
    text-align: center;
    flex: 1 1 auto;
    max-width: calc(100% - 16px);
    height: calc(100% - 16px);
    border: none;
    color: var(--color-primary);

    font-size: 18px;
  }

  input:focus {
    outline: none;
  }
  input:disabled {
    background: none;
  }

  .cell:focus-within {
    outline: 1px solid var(--color-light);
  }

  .cell.readonly {
    background-color: var(--background-result);
  }

  .cell.readonly input,
  .cell.readonly .label {
    color: var(--color-result);
  }

  .label {
    position: absolute;
    top: 4px;
    left: 4px;
    opacity: 0.75;
    font-size: 12px;
    color: var(--color-primary);
  }
</style>
