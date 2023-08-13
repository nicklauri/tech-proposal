<script lang="ts">
  import type { InfiniteEvent } from "svelte-virtual-infinite-list"
  import VirtualInfiniteList from "svelte-virtual-infinite-list"
  import { onMount } from "svelte"
  import { virtualScrollList, type UserInfo, UserColumns } from "$lib/stores/table"
  import { sleepAsync } from "$lib/utils/time"
  import { twMerge } from "tailwind-merge"
  import { Button, Checkbox, Input, Toggle } from "flowbite-svelte"
  import SpinnerIcon from "$lib/icons/SpinnerIcon.svelte"
  import BoxIcon from "$lib/icons/BoxIcon.svelte"

  let loading = true
  let start = 0
  let end = 0
  let loadMoreAmount = 100
  let loadMoreAmountString = loadMoreAmount.toString()
  let loadMoreAmountErr = ""
  let currentLoadMoreItems = 0
  let shouldLazyLoad = false
  let virtualInfiniteList: VirtualInfiniteList

  $: {
    const num = Number(loadMoreAmountString)
    if (!isNaN(num)) {
      loadMoreAmount = num
      loadMoreAmountErr = ""
      break $
    }

    loadMoreAmount = 0
    loadMoreAmountErr = "Invalid number!"
  }

  async function onInitialize() {
    await virtualInfiniteList.scrollToTop()
  }

  async function onInfinite({ detail }: InfiniteEvent) {
    if (detail.on === "top" || !shouldLazyLoad) {
      return
    }

    return loadMore()
  }

  async function loadMore() {
    if (!loadMoreAmount || loadMoreAmount <= 0) {
      return
    }

    loading = true
    const fixedSleep = 2000
    currentLoadMoreItems = loadMoreAmount
    await sleepAsync(fixedSleep)
    virtualScrollList.loadMore(loadMoreAmount)

    loading = false
  }

  onMount(async () => {
    loading = true

    virtualScrollList.loadMore(100)

    console.log(`loadmore:`, $virtualScrollList.length)

    loading = false
  })

  const columnNames = Object.values(UserColumns)

  $: shouldLazyLoad && end === $virtualScrollList.length && onInfinite({ detail: "bottom" } as any)
</script>

<div class="controls py-2 flex gap-3">
  <div class="flex gap-2">
    <div class="font-medium flex items-center h-[30px]">Load more amount:</div>
    <div>
      <Input placeholder="Load more amount" bind:value={loadMoreAmountString} class="py-1 w-[200px]" />
      {#if loadMoreAmountErr}
        <div class="text-rose-600 text-[12px] font-medium">
          {loadMoreAmountErr}
        </div>
      {/if}
    </div>
  </div>
  <div>
    <Button class="py-1 flex items-center gap-2" on:click={loadMore} disabled={loading}>
      {#if loading}
        <SpinnerIcon class="animate-spin text-[20px]" />
      {/if}

      Load now!
    </Button>
  </div>
  <div class="flex items-center">
    <Toggle bind:checked={shouldLazyLoad}>Lazy load items</Toggle>
  </div>
</div>

<div class="overflow-auto relative">
  <div class="sticky h-[32px] bg-gray-100 flex uppercase font-medium text-[12px] rounded-tl-md rounded-tr-md">
    {#each columnNames as column}
      <div class="table-cell" style={`--cell-width: ${column.width}`}>
        {column.title}
      </div>
    {/each}
  </div>

  <div class="h-[400px] overflow-auto relative">
    <VirtualInfiniteList
      items={$virtualScrollList}
      {loading}
      direction="bottom"
      persists={30}
      uniqueKey={"userId"}
      bind:start
      bind:end
      on:initialize={onInitialize}
      on:infinite={onInfinite}
      bind:this={virtualInfiniteList}
    >
      <!-- this will be rendered for each currently visible item -->
      <div slot="item" class="flex hover:bg-gray-200 h-[48px] border-b border-solid border-gray-200" let:item>
        {#each columnNames as column}
          {@const value = item[column.name]}
          {@const isImg = column.name === "avatar"}

          <div class={twMerge("table-cell")} style={`--cell-width: ${column.width}`}>
            {#if isImg}
              <img src={value} alt={item.username} class="rounded-full shadow-sm" width="24" />
            {:else}
              {value}
            {/if}
          </div>
        {/each}
      </div>

      <!-- option -->
      <div slot="loader" class="uppercase flex justify-center items-center">
        <div class="flex gap-2 justify-center items-center font-bold text-primary-700 py-3">
          <SpinnerIcon class="animate-spin text-[20px]" />
          <div>loading...</div>
        </div>
      </div>

      <!-- option -->
      <div slot="empty" class="flex flex-col items-center justify-center h-[100%]">
        <BoxIcon class="text-[40px] text-primary-800" />
        <i class="inline-block text-primary-800">Empty</i>
      </div>
    </VirtualInfiniteList>
  </div>
</div>

<div class="flex gap-2 mt-4">
  <div class="sum">
    <div class="sum-header">Total:</div>
    <div>{$virtualScrollList.length}</div>
  </div>
  <div class="sum">
    <div class="sum-header">View range:</div>
    <div>{start} - {end}</div>
  </div>
  <div class="sum">
    <div class="sum-header">Load more amount:</div>
    <div>{loadMoreAmount}</div>
  </div>
  <div class="sum">
    <div class="sum-header">Lazy load:</div>
    <div class:text-emerald-700={shouldLazyLoad} class:text-rose-700={!shouldLazyLoad} class="font-medium">
      {shouldLazyLoad ? "YES" : "NO"}
    </div>
  </div>
</div>

<style>
  .table-cell {
    width: var(--cell-width, 120px);
    flex-basis: var(--cell-width, 120px);
    @apply py-3 px-4 flex items-center text-ellipsis overflow-hidden whitespace-nowrap;
  }

  .sum {
    @apply flex items-center gap-2 text-[12px] text-slate-700;
  }

  .sum:not(:last-child):after {
    content: "";
    @apply w-[2px] bg-slate-400 h-[100%];
  }

  .sum-header {
    @apply uppercase text-[12px] font-bold;
  }
</style>
