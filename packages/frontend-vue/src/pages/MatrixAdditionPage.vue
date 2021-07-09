<template>
  <OperationPage />
</template>

<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import OperationPage from '../pages/OperationPage.vue';

export default defineComponent({
  name: 'matrix-addition-page',
  components: {
    OperationPage
  }
})
</script>