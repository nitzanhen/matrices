<template>
  <div class="bar">
    <span class="text">
      <h1>
        <router-link to="/">Coolest Matrices</router-link>
      </h1>
      <span v-if="!!pagename">/</span>
      <span v-if="!!pagename">{{ pagename }}</span>
    </span>
    <a href="https://github.com/NitzanHen/matrices">
      <Github class="github" />
    </a>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Github from "./svg/Github.vue";

export default defineComponent({
  name: 'top-bar',
  components: {
    Github,
  },
  props: {
    pagename: String
  },
  setup(props) {
    return props;
  }
})
</script>

<style scoped>
.bar {
  background-color: var(--background-dark);
  color: white;
  padding: 16px;
  box-shadow: 0px 3px 9px 0px #00000050;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text > h1 {
  display: inline;
}
.text > :not(h1) {
  font-size: 22px;
  letter-spacing: 2;
}
.text > :not(:last-child) {
  margin-right: 8px;
}

.github {
  width: 2em;
  height: 2em;
  fill: white;
  display: block;
}
</style>