<script lang="ts">
  import DemoInfo from "$lib/components/DemoInfo.svelte"
  import VirtualList from "./VirtualList.svelte"
</script>

<DemoInfo>
  The capability to render infinite rows with lazy loading items!<br />
  Note: A delay of 2 seconds is added to simulate lazy loading.
</DemoInfo>

<VirtualList />
