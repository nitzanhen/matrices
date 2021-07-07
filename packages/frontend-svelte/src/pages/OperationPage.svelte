<script lang="ts">
  import { useNavigate } from 'svelte-navigator';
  import BackArrow from '../components/svg/BackArrow.svelte';
  import Tip from '../components/svg/Tip.svelte';
  import { stringifyStyles } from '../utils';

  const navigate = useNavigate();

  $: tipIconStyle = stringifyStyles({
    width: '2em',
    height: '2em',
    opacity: '0.6',
    fill: 'var(--color-primary)'
  });
</script>

<div class="root">
  <button class="back-button" on:click={() => navigate(-1)}>
    <BackArrow />
  </button>

  <div class="content">
    <slot />
  </div>
  <aside class="tip">
    <div>
      <Tip style={tipIconStyle} />
    </div>
    <div>
      <h2>Tip!</h2>
      <p>Try navigating the matrix cells with the arrow keys or with tab.</p>
    </div>
  </aside>
</div>

<style>
  .root {
    width: calc(100% - 2 * 16px);
    height: calc(100% - 2 * 16px);
    padding: 16px;
    display: grid;
    grid-template-areas:
      'back title .'
      '. content .'
      '. tip .';
    grid-template-columns: 5vw 1fr 5vw;
  }

  .content {
    grid-area: content;
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    row-gap: 50px;
    column-gap: 40px;
  }

  .content > :global(svg) {
    width: 48px;
    height: 48px;
    fill: var(--color-light);
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
    padding: 12px 16px 12px 12px;

    background-color: var(--background-light);
    display: flex;
    align-items: center;
    border-radius: 8px;
    column-gap: 8px;
  }
</style>
