<script lang="ts">
  import { watchFile } from "$lib/stores/watch-file"
  import { Button, Input } from "flowbite-svelte"
  import { onDestroy, onMount } from "svelte"
  import { twMerge } from "tailwind-merge"

  let err = ""

  let filePath = ``

  onMount(async () => {
    watchFile.reset()
    // await watchFile.updateState()
  })

  onDestroy(async () => {
    await watchFile.stopWatching()
  })

  const toggleWatching = async () => {
    if ($watchFile.isWatching) {
      await watchFile.stopWatching()
      return
    }

    watchFile.startWatching(filePath).catch((e) => (err = e))
  }

  const turnOffErr = () => {
    err = ""
  }

  const errMsgMap = new Map([
    ["FileNotExist", "File does not exist."],
    ["AlreadyWatching", "The file watching operator is started."],
  ])

  $: console.log($watchFile)
  $: $watchFile.isWatching && turnOffErr()
  $: errMsg = errMsgMap.get(err) || err
</script>

<div class="flex flex-col gap-3">
  <div class="flex items-center gap-4">
    <div class="font-semibold">File path:</div>
    <Input
      type="text"
      class="focus:ring-0 py-[2px] w-[300px] inline-block"
      placeholder="File path to watch"
      disabled={$watchFile.isWatching}
      bind:value={filePath}
    />
    <Button
      class={twMerge(
        "bg-primary-600 hover:bg-primary-800 text-md",
        $watchFile.isWatching && "bg-rose-600 hover:bg-rose-800 focus-visible:bg-current"
      )}
      on:click={toggleWatching}
      disabled={!filePath?.trim()}
    >
      {#if $watchFile.isWatching}
        Stop watching
      {:else}
        Start watching
      {/if}
    </Button>

    {#if err}
      <div class="text-[12px] font-semibold text-rose-700">{errMsg}</div>
    {/if}
  </div>
  <div class="h-[300px] w-[500px] rounded-lg border-primary-800 border-[1px] p-2 overflow-auto">
    {#if $watchFile.content !== null}
      <pre>{$watchFile.content}</pre>
    {:else}
      <i>There is nothing to display!</i>
    {/if}
  </div>
</div>
