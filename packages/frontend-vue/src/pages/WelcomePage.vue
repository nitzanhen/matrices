  <template>
  <div class="welcome-page-root">
    <div class="content">
      <img :src="calculator" />
      <h1>Welcome!</h1>
      <p>select an operation to get started</p>
      <div class="actions">
        <h2>Matrix</h2>
        <span></span>
        <h2>Vector</h2>

        <div>
          <HomeLink to="/matrix/sum" class="link">Matrix addition</HomeLink>
          <HomeLink to="/matrix/product" class="link">Matrix multiplication</HomeLink>
          <HomeLink to="/matrix/transpose" class="link">Matrix transpose</HomeLink>
          <HomeLink to="/matrix/determinant" class="link">Matrix determinant</HomeLink>
        </div>
        <span class="divider"></span>
        <div>
          <HomeLink to="/vector/dot" class="link">Dot product</HomeLink>
          <HomeLink to="/vector/cross" class="link">Cross product</HomeLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import calculator from '../assets/calculator.svg'
import HomeLink from "../components/HomeLink.vue";

export default defineComponent({
  name: 'welcome-page',
  components: {
    HomeLink
  },
  setup() {
    return { calculator }
  }
})
</script>

<style scoped>
.welcome-page-root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
}
.content > img {
  max-width: 40vh;
  max-height: 40vh;
}

.actions {
  width: 100%;

  display: grid;
  grid-template-rows: auto auto;
  row-gap: 16px;
  grid-template-columns: 1fr 1px 1fr;
  column-gap: 16px;

  overflow: hidden;
  margin-top: 40px;
}
.actions > div {
  flex: 1 1 50%;
  padding: 8px;

  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 16px;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
}

.divider {
  display: block;
  width: 1px;
  flex: 0 0 auto;

  background-color: var(--background-dark);
  opacity: 0.3;
}

.link {
  max-width: 120px;
}
</style>