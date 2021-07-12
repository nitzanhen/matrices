<template>
  <OperationPage>
    <Matrix v-bind="props1" v-on="handlers1">
      <template v-slot:label>A</template>
    </Matrix>
    <Matrix v-bind="props2" v-on="handlers2">
      <template v-slot:label>B</template>
    </Matrix>
  </OperationPage>
</template>

<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import OperationPage from '../pages/OperationPage.vue';
import Matrix from "../components/matrix/Matrix.vue";
import { useMatrix } from "../composable/useMatrix";

export default defineComponent({
  name: 'matrix-addition-page',
  components: {
    OperationPage,
    Matrix
  },

  setup() {
    const matrix1 = useMatrix();
    const matrix2 = useMatrix();

    return { 
      props1: matrix1.props, 
      handlers1: matrix1.eventHandlers,
      props2: matrix2.props,
      handlers2: matrix2.eventHandlers 
    }
  }
})
</script>