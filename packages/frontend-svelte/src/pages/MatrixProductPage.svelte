<script>
  import { multiplyMatrices } from '@matrices/common';

  import Matrix from '../components/matrix/Matrix.svelte';
  import Equal from '../components/svg/Equal.svelte';
import Multiply from '../components/svg/Multiply.svelte';
  import { useMatrix } from '../store/useMatrix';

  import OperationPage from './OperationPage.svelte';

  let { cells: cells1, props: props1 } = useMatrix();
  let { cells: cells2, props: props2 } = useMatrix();

  let {
    cells: productCells,
    props: productProps,
    clear: clearProduct
  } = useMatrix({ readonly: true, unresizable: true });

  $: {
    const result = multiplyMatrices($cells1, $cells2);
    if (result.ok) {
      productCells.set(result.value);
    } else {
      clearProduct();
    }
  }
</script>

<OperationPage>
  <Matrix {...$props1}>
    <svelte:fragment slot="label">A</svelte:fragment>
  </Matrix>
  <Multiply />
  <Matrix {...$props2}>
    <svelte:fragment slot="label">B</svelte:fragment>
  </Matrix>
  <Equal />
  <Matrix {...$productProps}>
    <svelte:fragment slot="label">AB</svelte:fragment>
  </Matrix>
</OperationPage>
