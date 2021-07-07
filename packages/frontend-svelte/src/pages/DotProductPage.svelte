<script>
  import { dotProduct, generateVector } from '@matrices/common';

  import Matrix from '../components/matrix/Matrix.svelte';
  import Equal from '../components/svg/Equal.svelte';
  import { useMatrix } from '../store/useMatrix';

  import OperationPage from './OperationPage.svelte';

  let { cells: cells1, props: props1 } = useMatrix({
    unresizable: true,
    defaultCells: [generateVector(3, () => undefined)]
  });
  let { cells: cells2, props: props2 } = useMatrix({
    unresizable: true,
    defaultCells: [generateVector(3, () => undefined)]
  });

  let {
    cells: productCells,
    props: productProps,
    clear: clearproduct
  } = useMatrix({ readonly: true, unresizable: true, defaultCells: [[undefined]] });

  $: {
    const [u] = $cells1;
    const [v] = $cells2
    const result = dotProduct(u, v);
    if (result.ok) {
      productCells.set([[result.result]]);
    } else {
      clearproduct();
    }
  }
</script>

<OperationPage>
  <Matrix {...$props1}>
    <svelte:fragment slot="label">u</svelte:fragment>
  </Matrix>
  <Matrix {...$props2}>
    <svelte:fragment slot="label">v</svelte:fragment>
  </Matrix>
  <Equal />
  <Matrix {...$productProps}>
    <svelte:fragment slot="label">u·v</svelte:fragment>
  </Matrix>
</OperationPage>
