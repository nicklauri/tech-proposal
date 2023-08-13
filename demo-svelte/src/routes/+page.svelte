<script lang="ts">
  import { Input } from "flowbite-svelte"

  let name = "Khoa"
</script>

<div class="main">
  <div>The hello engine!</div>

  <Input class="w-[500px]" bind:value={name} placeholder="Tell me your name" />

  <div>Hello {name}!</div>
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
