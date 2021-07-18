<script>
  import { crossProduct, generateVector } from '@matrices/common';

  import Matrix from '../components/matrix/Matrix.svelte';
  import Equal from '../components/svg/Equal.svelte';
import Multiply from '../components/svg/Multiply.svelte';
  import { useMatrix } from '../store/useMatrix';

  import OperationPage from './OperationPage.svelte';

  let { cells: cells1, props: props1 } = useMatrix({
    unresizable: true,
    defaultCells: [generateVector(3)]
  });
  let { cells: cells2, props: props2 } = useMatrix({
    unresizable: true,
    defaultCells: [generateVector(3)]
  });

  let {
    cells: productCells,
    props: productProps,
    clear: clearProduct
  } = useMatrix({ readonly: true, unresizable: true, defaultCells: [generateVector(3)] });

  $: {
    const [u] = $cells1;
    const [v] = $cells2;
    const result = crossProduct(u, v);
    if (result.ok) {
      productCells.set([result.value]);
    } else {
      clearProduct();
    }
  }
</script>

<OperationPage>
  <Matrix {...$props1}>
    <svelte:fragment slot="label">u</svelte:fragment>
  </Matrix>
  <Multiply />
  <Matrix {...$props2}>
    <svelte:fragment slot="label">v</svelte:fragment>
  </Matrix>
  <Equal />
  <Matrix {...$productProps}>
    <svelte:fragment slot="label">u×v</svelte:fragment>
  </Matrix>
</OperationPage>
