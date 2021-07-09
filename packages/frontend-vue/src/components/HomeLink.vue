<template>
  <router-link v-bind="props" class="home-link">
    <slot></slot>
  </router-link>
</template>

<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import { RouterLinkProps } from "vue-router";


/** A styled wrapper around Vue router's `router-link` */
export default defineComponent((props: RouterLinkProps) => ({
  props
}))
</script>

<style scoped>
.home-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  border: none;
  cursor: pointer;

  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;

  background-color: var(--background-light);
  color: "var(--color-primary)";
}
</style>