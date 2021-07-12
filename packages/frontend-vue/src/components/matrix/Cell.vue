<template>
  <div class="cell" :class="{ readonly }">
    <span v-if="!!$slots.label" class="label">
      <slot name="label"></slot>
    </span>
    <input :value="value ?? ''" @input="handleInput" @keydown="handleKeyDown" :disabled="readonly" />
  </div>
</template>

<script lang='ts'>
import { CellValue } from "@matrices/common";
import { computed, defineComponent, PropType } from "@vue/runtime-core";


export default defineComponent({
  name: 'cell',
  props: {
    readonly: Boolean,
    row: {
      type: Number,
      required: true
    },
    column: {
      type: Number,
      required: true
    },
    setFocus: {
      type: Function as PropType<(row: number, column: number) => void>,
      required: true
    },
    modelValue: {
      validator: (prop: unknown) => typeof prop === 'number' || prop === null,
      required: true,
    } as unknown as { type: PropType<CellValue>, required: true }
  },
  emits: [
    'update:modelValue'
  ],

  setup(props, { emit }) {

    const value = computed({
      get() {
        return props.modelValue
      },
      set(newValue: CellValue) {
        emit('update:modelValue', newValue)
      }
    })

    const handleInput = (e: Event | React.FormEvent<HTMLInputElement>) => {
      const { value: rawValue } = e.currentTarget as HTMLInputElement;
      if (rawValue === '') {
        value.value = null;
      }

      const parsed = parseFloat(rawValue);
      if (!isNaN(parsed)) {
        value.value = parsed;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const el = e.target as HTMLInputElement;

      switch (e.key) {
        case 'ArrowLeft': {
          if (el.selectionStart === 0) {
            e.preventDefault();
            e.stopPropagation();
            props.setFocus(props.row, props.column - 1);
          }
          break;
        }
        case 'ArrowRight': {
          if (!value || el.selectionStart === String(value).length) {
            e.preventDefault();
            e.stopPropagation();
            props.setFocus(props.row, props.column + 1);
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          e.stopPropagation();
          props.setFocus(props.row - 1, props.column);
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          e.stopPropagation();
          props.setFocus(props.row + 1, props.column);
          break;
        }
      }
    }

    return { handleInput, value, handleKeyDown }
  }
})

</script>

<style scoped>
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
  border: 1px solid transparent;
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