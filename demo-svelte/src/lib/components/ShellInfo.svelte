<script lang="ts">
  import { ShellInfo } from "$lib/stores/shell";
</script>

{#await $ShellInfo}
  <div class="fetching">Fetching shell information.</div>
{:then info}
  <pre>{JSON.stringify(info, undefined, 2)}</pre>
{/await}

<style>
  pre {
    font-family: Consolas, monospace;
  }
</style>
