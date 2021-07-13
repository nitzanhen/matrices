<template>
  <OperationPage>
    <Matrix v-bind="props1" v-on="handlers1">
      <template v-slot:label>A</template>
    </Matrix>
    <Multiply></Multiply>
    <Matrix v-bind="props2" v-on="handlers2">
      <template v-slot:label>B</template>
    </Matrix>
    <Equals></Equals>
    <Matrix v-bind="productProps" v-on="productHandlers">
      <template v-slot:label>AB</template>
    </Matrix>
  </OperationPage>
</template>

<script lang='ts'>
import { defineComponent, watchEffect } from "@vue/runtime-core";
import OperationPage from '../pages/OperationPage.vue';
import Matrix from "../components/matrix/Matrix.vue";
import { useMatrix } from "../composable/useMatrix";
import Equals from "../components/svg/Equals.vue";
import { multiplyMatrices } from "@matrices/common";
import Multiply from "../components/svg/Multiply.vue";

export default defineComponent({
  name: 'matrix-multiplication-page',
  components: {
    OperationPage,
    Matrix,
    Multiply,
    Equals
  },

  setup() {
    const matrix1 = useMatrix();
    const matrix2 = useMatrix();

    const product = useMatrix({ unresizable: true, readonly: true });

    watchEffect(() => {
      const result = multiplyMatrices(matrix1.cells.value, matrix2.cells.value);
      if (result.ok) {
        product.cells.value = result.result;
      }
      else {
        product.clear();
      }
    })

    return {
      props1: matrix1.props,
      handlers1: matrix1.eventHandlers,
      props2: matrix2.props,
      handlers2: matrix2.eventHandlers,
      productProps: product.props,
      productHandlers: product.eventHandlers
    }
  }
})
</script>