<template>
  <div class="operation-page-root">
    <button class="back-button" @click="goBack">
      <BackArrow />
    </button>

    <div class="operation-page-content">
      <slot></slot>
    </div>

    <aside class="tip">
      <div>
        <Tip class="tip-icon" />
      </div>
      <div>
        <h2>Tip!</h2>
        <p>Try navigating the matrix cells with the arrow keys or with tab.</p>
      </div>
    </aside>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import BackArrow from '../components/svg/BackArrow.vue';
import Tip from "../components/svg/Tip.vue";

export default defineComponent({
  name: 'operation-page',
  components: {
    BackArrow,
    Tip
  },
  setup() {
    const router = useRouter();

    const goBack = () => router.go(-1);

    return { goBack }
  }
})
</script>

<style scoped>
  .operation-page-root {
    width: calc(100% - 2 * 16px);
    height: calc(100% - 2 * 16px);
    padding: 16px;
    
    display: grid;
    grid-template-areas: 
    "back title ."
    ". content ."
    ". tip .";
    grid-template-columns: 5vw 1fr 5vw;
  }

  .operation-page-content {
    grid-area: content;
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    row-gap: 50px;
    column-gap: 40px;
  }

  .back-button {
    grid-area: back;
    width: 40px;
    height: 40px;
    padding: 4px;
    
    appearance: none;
    border: none;
    background: none;
    cursor: pointer;
    fill: var(--color-light);

    border-radius: 50%;
    box-shadow: 0px 3px 6px 3px rgba(0, 0, 0, 0.12);
  }

  .tip {
    grid-area: tip;
    width: max-content;
    margin: 0 auto;
    align-self: flex-start;
    padding: 12px;
    padding-right: 16px;

    background-color: var(--background-light);
    border-radius: 8px;
    
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
  .tip-icon {
    width: 2em;
    height: 2em;
    opacity: 0.6;
    fill: var(--color-primary);
  }
</style>

<style>
  .operation-page-content svg {
    width: 48px;
    height: 48px;
    fill: var(--color-light);
  }
</style>