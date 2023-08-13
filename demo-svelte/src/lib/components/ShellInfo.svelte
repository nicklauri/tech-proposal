<script lang="ts">
  import { shell } from "$lib/stores/shell"
  import DemoInfo from "./DemoInfo.svelte"
</script>

<DemoInfo>Svelte can fetch the shell's info.</DemoInfo>

<div class="mt-4">
  {#await $shell.getShellInfoAsync()}
    <div class="fetching">Fetching shell information.</div>
  {:then info}
    <pre>{JSON.stringify(info, undefined, 2)}</pre>
  {/await}
</div>

<style>
  pre {
    font-family: "Jetbrains Mono", Consolas, monospace;
  }
</style>
