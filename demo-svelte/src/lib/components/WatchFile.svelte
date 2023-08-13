<script lang="ts">
  import StartIcon from "$lib/icons/StartIcon.svelte"
  import StopIcon from "$lib/icons/StopIcon.svelte"
  import { watchFile } from "$lib/stores/watch-file"
  import { Button, Input } from "flowbite-svelte"
  import { onDestroy, onMount } from "svelte"
  import { twMerge } from "tailwind-merge"
  import DemoInfo from "./DemoInfo.svelte"
  import BoxIcon from "$lib/icons/BoxIcon.svelte"

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

    watchFile.startWatching(filePath).catch((e) => (err = e.message))
  }

  const turnOffErr = () => {
    err = ""
  }

  const errMsgMap = new Map([
    ["FileNotExist", "File does not exist."],
    ["AlreadyWatching", "The file watching operator is started."],
  ])

  $: $watchFile.isWatching && turnOffErr()
  $: errMsg = errMsgMap.get(err) || err
</script>

<div class="flex flex-col gap-3 grow">
  <DemoInfo>
    This demonstration shows the capabilities of communication from <strong>shell</strong> to <strong>frontend</strong>.
    <br />
    The shell (Webview2) is using <code>FileSystemWatcher</code> and notify frontend (Svelte) if the current watching file
    is changed.
  </DemoInfo>

  <div class="flex items-center gap-4">
    <div class="font-semibold">File path:</div>
    <Input
      type="text"
      class="w-[300px] inline-block py-1"
      placeholder="File path to watch"
      disabled={$watchFile.isWatching}
      bind:value={filePath}
    />
    <Button
      color={$watchFile.isWatching ? "red" : "primary"}
      on:click={toggleWatching}
      disabled={!filePath?.trim()}
      class="flex items-center gap-2 transition-all duration-[0.3ms] py-1"
    >
      {#if $watchFile.isWatching}
        <StopIcon class="text-[16px]" />
        Stop watching
      {:else}
        <StartIcon class="text-[16px]" />
        Start watching
      {/if}
    </Button>

    {#if err}
      <div class="text-[12px] font-semibold text-rose-700">Error: {errMsg}</div>
    {/if}
  </div>
  <div
    class={twMerge(
      "w-[100%] rounded-lg border-slate-600 border-[2px] grow relative overflow-hidden",
      $watchFile.content === null && "flex items-center justify-center flex-col gap-1",
      $watchFile.isWatching && "border-primary-600"
    )}
  >
    {#if $watchFile.content !== null}
      <div class="inset-2 absolute overflow-auto">
        <pre class="absolute inset-0">{$watchFile.content}</pre>
      </div>
    {:else}
      <BoxIcon class="text-[40px] text-primary-600" />
      <i class="inline-block text-primary-600">Empty</i>
    {/if}
  </div>
</div>
