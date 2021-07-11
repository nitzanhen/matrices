<template>
  <div class="cell" :class="{ readonly }">
    <span v-if="!!$slots.label">
      <slot name="label"></slot>
    </span>
  </div>
  <input :value="value ?? ''" @input="handleInput" @keydown="handleKeyDown" :disabled="readonly" />
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
      type: Number as PropType<CellValue>,
      required: true,
    }
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

<style>
</style>