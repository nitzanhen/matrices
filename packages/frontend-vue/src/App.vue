<template>
  <div class="root">
    <TopBar :pagename="pagename"></TopBar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import TopBar from './components/TopBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    TopBar
  },

  setup() {
    const route = useRoute();

    const pagename = route.path.substring(1);
    console.log(pagename)
    return { pagename }
  }
})
</script>

<style>
:root {
  --background-light: #f0efff;
  --background-dark: #3a3768;
  --background-result: #3a3768cd;
  --color-primary: #3f3c72;
  --color-light: #6c63ff;
  --color-result: #f0efff;
}
</style>
<style scoped>
.root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--color-primary);
}

.root > main {
  flex: 1 0 auto;
}
</style>
