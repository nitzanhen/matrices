<script>
  import { determinant, generateMatrix } from '@matrices/common';

  import Matrix from '../components/matrix/Matrix.svelte';
  import RightArrow from '../components/svg/RightArrow.svelte';
  import { useMatrix } from '../store/useMatrix';

  import OperationPage from './OperationPage.svelte';

  let { cells: cells1, props: props1 } = useMatrix();

  let {
    cells: determinantCells,
    props: determinantProps,
    clear: clearDeterminant
  } = useMatrix({ readonly: true, unresizable: true, defaultCells: generateMatrix(1, 1) });

  $: {
    const result = determinant($cells1);
    if (result.ok) {
      determinantCells.set([[result.result]]);
    } else {
      clearDeterminant();
    }
  }
</script>

<OperationPage>
  <Matrix {...$props1}>
    <svelte:fragment slot="label">A</svelte:fragment>
  </Matrix>
  <RightArrow />
  <Matrix {...$determinantProps}>
    <svelte:fragment slot="label">|A|</svelte:fragment>
  </Matrix>
</OperationPage>
