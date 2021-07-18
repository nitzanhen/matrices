<template>
  <OperationPage>
    <Matrix v-bind="props1" v-on="handlers1">
      <template v-slot:label>A</template>
    </Matrix>
    <RightArrow></RightArrow>
    <Matrix v-bind="detProps" v-on="detHandlers">
      <template v-slot:label>|A|</template>
    </Matrix>
  </OperationPage>
</template>

<script lang='ts'>
import { defineComponent, watchEffect } from "@vue/runtime-core";
import OperationPage from '../pages/OperationPage.vue';
import Matrix from "../components/matrix/Matrix.vue";
import { useMatrix } from "../composable/useMatrix";
import { determinant } from "@matrices/common";
import RightArrow from "../components/svg/RightArrow.vue";

export default defineComponent({
  name: 'matrix-determinant-page',
  components: {
    OperationPage,
    Matrix,
    RightArrow
  },

  setup() {
    const matrix = useMatrix();

    const det = useMatrix({ readonly: true, unresizable: true, defaultCells: [[null]] });

    watchEffect(() => {
      const result = determinant(matrix.cells.value);
      if (result.ok) {
        det.cells.value = [[result.value]];
      }
      else {
        det.clear();
      }
    })

    return {
      props1: matrix.props,
      handlers1: matrix.eventHandlers,
      detProps: det.props,
      detHandlers: det.eventHandlers
    }
  }
})
</script>