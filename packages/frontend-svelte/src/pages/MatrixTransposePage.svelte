<script>
  import { transpose } from '@matrices/common';

  import Matrix from '../components/matrix/Matrix.svelte';
  import RightArrow from '../components/svg/RightArrow.svelte';
  import { useMatrix } from '../store/useMatrix';

  import OperationPage from './OperationPage.svelte';

  let { cells: cells1, props: props1 } = useMatrix();

  let {
    cells: transposeCells,
    props: transposeProps,
    clear: clearTranspose
  } = useMatrix({ readonly: true, unresizable: true });

  $: {
    const result = transpose($cells1);
    if (result.ok) {
      transposeCells.set(result.value);
    } else {
      clearTranspose();
    }
  }
</script>

<OperationPage>
  <Matrix {...$props1}>
    <svelte:fragment slot="label">A</svelte:fragment>
  </Matrix>
  <RightArrow />
  <Matrix {...$transposeProps}>
    <svelte:fragment slot="label">A<sup>t</sup></svelte:fragment>
  </Matrix>
</OperationPage>
