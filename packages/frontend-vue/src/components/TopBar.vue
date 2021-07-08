<template>
  <div class="root">
    <span>
      <h1>
        <router-link to="/">Coolest Matrices</router-link>
      </h1>
      <span v-if="!!pagename">/</span>
      <span v-if="!!pagename">{{ pagename }}</span>
    </span>
    <a href="https://github.com/NitzanHen/matrices">
      Github
    </a>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    pagename: String
  },
  setup(props) {
    return props;
  }
})
</script>

<style scoped>
  .root {
    background-color: var(--background-dark);
    color: white;
    padding: 16px;
    box-shadow: 0px 3px 9px 0px #00000050;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .github {
    width: 2em;
    height: 2em;
    fill: white;
    display: block;
  }
</style>