<script lang="ts">
  import type { CellValue } from '@matrices/common';
  /**
   * A simple cell; used as part of a Matrix, even if it contains only a single cell.
   */
  export let readonly: boolean = false;

  export let row: number;
  export let column: number;
  export let setFocus: (row: number, column: number) => void;

  export let value: CellValue;

  type ChangeEvent = Event & { currentTarget: EventTarget & HTMLInputElement };
  $: handleInput = (e: ChangeEvent) => {
    const { value: rawValue } = e.currentTarget;
    if (rawValue === '') {
      value = undefined;
    }
    const parsed = parseFloat(rawValue);
    if (!isNaN(parsed)) {
      value = parsed;
    }
  };

  /**
   * Handles the change of focus when arrows keys are pressed.
   */
  $: handleKeyDown = (e: KeyboardEvent) => {
    const el = e.target as HTMLInputElement;

    switch (e.key) {
      case 'ArrowLeft': {
        if (el.selectionStart === 0) {
          e.preventDefault();
          e.stopPropagation();
          setFocus(row, column - 1);
        }
        break;
      }
      case 'ArrowRight': {
        if (!value || el.selectionStart === String(value).length) {
          e.preventDefault();
          e.stopPropagation();
          setFocus(row, column + 1);
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        e.stopPropagation();
        setFocus(row - 1, column);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        e.stopPropagation();
        setFocus(row + 1, column);
        break;
      }
    }
  };
</script>

<div class="cell" class:readonly>
  {#if $$slots.label}
    <span class="label">
      <slot name="label" />
    </span>
  {/if}
  <input
    value={value ?? ''}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    disabled={readonly}
    {...$$restProps}
  />
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
    box-sizing: border-box;
    border: 1px solid transparent
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
    border-color: var(--color-light);
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
