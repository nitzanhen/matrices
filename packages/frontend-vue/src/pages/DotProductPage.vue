<template>
  <OperationPage>
    <Matrix v-bind="props1" v-on="handlers1">
      <template v-slot:label>u</template>
    </Matrix>
    <Dot></Dot>
    <Matrix v-bind="props2" v-on="handlers2">
      <template v-slot:label>v</template>
    </Matrix>
    <Equals></Equals>
    <Matrix v-bind="productProps" v-on="productHandlers">
      <template v-slot:label>u·v</template>
    </Matrix>
  </OperationPage>
</template>

<script lang='ts'>
import { defineComponent, watchEffect } from "@vue/runtime-core";
import OperationPage from '../pages/OperationPage.vue';
import Matrix from "../components/matrix/Matrix.vue";
import { useMatrix } from "../composable/useMatrix";
import { dotProduct, generateVector } from "@matrices/common";
import Dot from "../components/svg/Dot.vue";
import Equals from "../components/svg/Equals.vue";

export default defineComponent({
  name: 'dot-product-page',
  components: {
    OperationPage,
    Matrix,
    Dot,
    Equals
  },

  setup() {
    const vector1 = useMatrix({ unresizable: true, defaultCells: [generateVector(3)] });
    const vector2 = useMatrix({ unresizable: true, defaultCells: [generateVector(3)] });

    const product = useMatrix({ readonly: true, unresizable: true, defaultCells: [[null]] });

    watchEffect(() => {
      const [v1] = vector1.cells.value;
      const [v2] = vector2.cells.value;

      const result = dotProduct(v1, v2);
      if (result.ok) {
        product.cells.value = [[result.result]];
      }
      else {
        product.clear();
      }
    })

    return {
      props1: vector1.props,
      handlers1: vector1.eventHandlers,
      props2: vector2.props,
      handlers2: vector2.eventHandlers,
      productProps: product.props,
      productHandlers: product.eventHandlers
    }
  }
})
</script>