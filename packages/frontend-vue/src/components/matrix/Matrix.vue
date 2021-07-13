<template>
  <div class="matrix-root">
    <div class="label">
      <span v-if="$slots.label">
        <slot name="label"></slot>
      </span>
      <article v-if="!unresizable" class="dimensions">
        <input v-model.number="numRows" />
        <Multiply></Multiply>
        <input v-model.number="numColumns" />
      </article>
    </div>

    <div
      class="matrix"
      ref="gridRef"
      :style="{ gridTemplateRows: `repeat(${numRows}, auto)`, gridTemplateColumns: `repeat(${numColumns}, auto)` }"
    >
      <Cell
        v-for="[i, j] in cellIndices"
        :key="(`${i} ${j}`)"
        :row="i"
        :column="j"
        :set-focus="setFocus"
        :readonly="readonly"
        v-model="cells[i][j]"
      >
        <template v-slot:label>
          <span>{{ `(${i}, ${j})` }}</span>
        </template>
      </Cell>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, toRefs } from '@vue/runtime-core';
import Multiply from '../svg/Multiply.vue';
import { Matrix } from '@matrices/common';
import { PropType, Ref, } from 'vue';
import Cell from './Cell.vue';
import { generateIndices } from '../../utils';

export default defineComponent({
  name: 'matrix',
  components: {
    Multiply,
    Cell
  },
  emits: ['numRowsChanged', 'numColumnsChanged'],
  props: {
    cells: {
      type: Array as PropType<Matrix>,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    unresizable: {
      type: Boolean,
      default: false
    },
    gridRef: {
      type: Object as PropType<Ref<HTMLDivElement | null>>,
      required: true
    },
    setFocus: {
      type: Function as PropType<(row: number, column: number) => void>,
      required: true
    }
  },
  setup(props, { emit }) {
    const { cells, readonly, unresizable, setFocus, gridRef } = toRefs(props);

    const numRows = computed({
      get() {
        return cells.value.length
      },
      set(newNumRows: number) {
        // This extra check is needed because if the input value cannot be parsed into a number, it returns the original string.
        if (typeof newNumRows === 'number') {
          emit('numRowsChanged', newNumRows)

        }
      }
    });
    const numColumns = computed({
      get() {
        return cells.value[0].length
      },
      set(newNumColumns: number) {
        // This extra check is needed because if the input value cannot be parsed into a number, it returns the original string.
        if (typeof newNumColumns === 'number') {
          emit('numColumnsChanged', newNumColumns)
        }
      }
    });

    const cellIndices = computed(() => [...generateIndices(numRows.value, numColumns.value)] as [number, number][]);

    const matrixStyles = computed(() => ({
      gridTemplateRows: `repeat(${numRows.value}, 100px)`,
      gridTemplateColumns: `repeat(${numColumns.value}, 100px)`
    }));

    return { cells, readonly, unresizable, setFocus, gridRef, cellIndices, matrixStyles, numRows, numColumns };
  }
})

</script>

<style scoped>
.matrix-root {
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
  color: var(--color-primary);
}
.label > :not(:last-child) {
  margin-right: 8px;
}

.dimensions {
  display: inline-flex;
  align-items: flex-end;

  padding: 2px 4px 6px 4px;
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
.dimensions > svg {
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