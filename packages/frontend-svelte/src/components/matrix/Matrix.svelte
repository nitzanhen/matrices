<script lang="ts">
  import type { Matrix } from '@matrices/common';
  import type { Writable } from 'svelte/store';
  import { range, stringifyStyles } from '../../utils';
  import Multiply from '../svg/Multiply.svelte';
  import Cell from './Cell.svelte';

  export let cells: Writable<Matrix>;
  export let readonly: boolean = false;
  export let unresizable: boolean = false;

  export let gridRef: Writable<HTMLDivElement | null>;
  export let setFocus: (row: number, column: number) => void;

  /**
   * Naturally, these would be on:event listeners.
   * However, since they are created in `useMatrix` and passed directly to this component,
   * setting them up as event listeners would add redundant work, and they are passed as props instead.
   */
  export let onNumRowsChanged: (newNumRows: number) => void;
  export let onNumColumnsChanged: (newNumColumns: number) => void;

  $: numRows = $cells.length;
  $: numColumns = $cells[0].length;

  type ChangeEvent = Event & { currentTarget: EventTarget & HTMLInputElement };
  $: handleNumRowsChange = (e: ChangeEvent) => {
    const value = e.currentTarget.value;
    const parsed = parseInt(value);

    if (!isNaN(parsed)) {
      onNumRowsChanged(parsed);
    }
  };
  $: handleNumColumnsChange = (e: ChangeEvent) => {
    const value = e.currentTarget.value;
    const parsed = parseInt(value);

    if (!isNaN(parsed)) {
      onNumColumnsChanged(parsed);
    }
  };

  $: matrixStyles = stringifyStyles({
    'grid-template-rows': `repeat(${numRows}, 100px)`,
    'grid-template-columns': `repeat(${numColumns}, 100px)`
  });
</script>

<div class="root">
  <div class="label">
    <span><slot name="label" /></span>
    {#if !unresizable}
      <article class="dimensions">
        <input tabindex={-1} type="number" value={numRows} on:input={handleNumRowsChange} />
        <Multiply />
        <input tabindex={-1} type="number" value={numColumns} on:input={handleNumColumnsChange} />
      </article>
    {/if}
  </div>

  <div class="matrix" bind:this={$gridRef} style={matrixStyles}>
    {#each range(0, numRows) as row}
      {#each range(0, numColumns) as column}
        <Cell
          {row}
          {column}
          {readonly}
          key={`(${row}, ${column})`}
          {setFocus}
          bind:value={$cells[row][column]}
        >
          <svelte:fragment slot="label">{`(${row},${column})`}</svelte:fragment>
        </Cell>
      {/each}
    {/each}
  </div>
</div>

<style>
  .root {
    width: max-content;
    height: max-content;
    position: relative;
  }

  .label {
    position: absolute;
    left: 0;
    right: 0;
    bottom: calc(100% + 8px);
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 28px;
    z-index: 100;
    color: var(--color-primary);
  }
  .label > :not(:last-child) {
    margin-right: 8px;
  }

  .dimensions {
    display: inline-flex;
    align-items: flex-end;

    padding: 2px 6px 4px 6px;
    background-color: var(--background-light);
    border-radius: 4px;
  }

  .dimensions > input {
    display: inline-block;
    background: none;
    border: none;
    border-bottom: 1px solid var(--color-primary);
    color: var(--color-primary);
    transition: all 100ms ease-in-out;
    text-align: center;
    font-size: 0.6em;
    width: 0.8em;
  }

  .dimensions > input:focus-visible {
    outline: none;
  }
  .dimensions > input:focus {
    border-color: var(--color-light);
  }

  .dimensions > :global(svg) {
    width: 0.7em;
    height: 0.7em;
    fill: var(--color-primary);
  }

  .matrix {
    display: grid;
    row-gap: 8px;
    column-gap: 8px;
  }
</style>
