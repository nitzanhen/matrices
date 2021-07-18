<script>
  import { addMatrices } from '@matrices/common';

  import Matrix from '../components/matrix/Matrix.svelte';
  import Equal from '../components/svg/Equal.svelte';
  import Plus from '../components/svg/Plus.svelte';
  import { useMatrix } from '../store/useMatrix';

  import OperationPage from './OperationPage.svelte';

  let { cells: cells1, props: props1 } = useMatrix();
  let { cells: cells2, props: props2 } = useMatrix();

  let {
    cells: sumCells,
    props: sumProps,
    clear: clearSum
  } = useMatrix({ readonly: true, unresizable: true });

  $: {
    const result = addMatrices($cells1, $cells2);
    if (result.ok) {
      sumCells.set(result.value);
    } else {
      clearSum();
    }
  }
</script>

<OperationPage>
  <Matrix {...$props1}>
    <svelte:fragment slot="label">A</svelte:fragment>
  </Matrix>
  <Plus />
  <Matrix {...$props2}>
    <svelte:fragment slot="label">B</svelte:fragment>
  </Matrix>
  <Equal />
  <Matrix {...$sumProps}>
    <svelte:fragment slot="label">A+B</svelte:fragment>
  </Matrix>
</OperationPage>
