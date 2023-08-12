<script lang="ts">
  import { shell } from "$lib/stores/shell"
</script>

{#await $shell.getShellInfoAsync()}
  <div class="fetching">Fetching shell information.</div>
{:then info}
  <pre>{JSON.stringify(info, undefined, 2)}</pre>
{/await}

<style>
  pre {
    font-family: "Jetbrains Mono", Consolas, monospace;
  }
</style>
