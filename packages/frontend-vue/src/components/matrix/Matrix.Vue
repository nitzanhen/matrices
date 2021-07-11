<template>
  <div class="matrix-root">
    <div class="label">
      <span>
        <slot name="label"></slot>
      </span>
      <article>
        <input />
        <Multiply />
        <input />
      </article>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/runtime-core';
import Multiply from '../svg/Multiply.vue';

export default defineComponent({
  components: {
    Multiply
  },

})

</script>