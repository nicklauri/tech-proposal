<script lang="ts">
  import DemoInfo from "$lib/components/DemoInfo.svelte"
  import { UserColumns, virtualScrollList } from "$lib/stores/table"
  import VirtualList from "./VirtualList.svelte"
  // import ReactList from "./ReactList.svelte"
</script>

<DemoInfo>The capability to render infinite rows!</DemoInfo>

<!-- <ReactList /> -->
<VirtualList />
