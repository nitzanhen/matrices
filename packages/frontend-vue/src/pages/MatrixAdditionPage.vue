<template>
  <OperationPage>
    <Matrix v-bind="props1" v-on="handlers1">
      <template v-slot:label>A</template>
    </Matrix>
    <Plus></Plus>
    <Matrix v-bind="props2" v-on="handlers2">
      <template v-slot:label>B</template>
    </Matrix>
    <Equals></Equals>
    <Matrix v-bind="sumProps" v-on="sumHandlers">
      <template v-slot:label>A+B</template>
    </Matrix>
  </OperationPage>
</template>

<script lang='ts'>
import { defineComponent, watchEffect } from "@vue/runtime-core";
import OperationPage from '../pages/OperationPage.vue';
import Matrix from "../components/matrix/Matrix.vue";
import { useMatrix } from "../composable/useMatrix";
import Plus from "../components/svg/Plus.vue";
import Equals from "../components/svg/Equals.vue";
import { addMatrices } from "@matrices/common";

export default defineComponent({
  name: 'matrix-addition-page',
  components: {
    OperationPage,
    Matrix,
    Plus,
    Equals
  },

  setup() {
    const matrix1 = useMatrix();
    const matrix2 = useMatrix();

    const sum = useMatrix({ unresizable: true, readonly: true });

    watchEffect(() => {
      const result = addMatrices(matrix1.cells.value, matrix2.cells.value);
      if (result.ok) {
        sum.cells.value = result.value;
      }
      else {
        sum.clear();
      }
    })

    return {
      props1: matrix1.props,
      handlers1: matrix1.eventHandlers,
      props2: matrix2.props,
      handlers2: matrix2.eventHandlers,
      sumProps: sum.props,
      sumHandlers: sum.eventHandlers
    }
  }
})
</script>