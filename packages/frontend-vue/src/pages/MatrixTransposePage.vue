<template>
  <OperationPage>
    <Matrix v-bind="props1" v-on="handlers1">
      <template v-slot:label>A</template>
    </Matrix>
    <RightArrow></RightArrow>
    <Matrix v-bind="transposedProps" v-on="transposedHandlers">
      <template v-slot:label>A<sup>t</sup></template>
    </Matrix>
  </OperationPage>
</template>

<script lang='ts'>
import { defineComponent, watchEffect } from "@vue/runtime-core";
import OperationPage from '../pages/OperationPage.vue';
import Matrix from "../components/matrix/Matrix.vue";
import { useMatrix } from "../composable/useMatrix";
import { transpose } from "@matrices/common";
import RightArrow from "../components/svg/RightArrow.vue";

export default defineComponent({
  name: 'matrix-transpose-page',
  components: {
    OperationPage,
    Matrix,
    RightArrow
  },

  setup() {
    const matrix = useMatrix();

    const transposed = useMatrix({ unresizable: true, readonly: true });

    watchEffect(() => {
      const result = transpose(matrix.cells.value);
      if (result.ok) {
        transposed.cells.value = result.result;
      }
      else {
        transposed.clear();
      }
    })

    return {
      props1: matrix.props,
      handlers1: matrix.eventHandlers,
      transposedProps: transposed.props,
      transposedHandlers: transposed.eventHandlers
    }
  }
})
</script>