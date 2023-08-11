<script lang="ts">
  import Urls from "$lib/consts/url"
  import { page } from "$app/stores"
  import { onMount } from "svelte"
  import { _initShell } from "$lib/stores/shell"
  import { invokeShellCallback } from "$lib/services/shell"
  import "$assets/css/global.scss"

  const urls = Object.entries(Urls).map(([_name, url]) => url)

  $: currentPage = urls.find((u) => u.path === $page.route.id)

  onMount(async () => {
    await _initShell()
  })
</script>

<div class="layout">
  <div class="head">
    <div class="navigation">Where to?</div>
    <div class="links">
      {#each urls as nav}
        <a href={nav.path} class="link" class:active={$page.route.id === nav.path}>{nav.name}</a>
      {/each}
    </div>
  </div>

  {#if currentPage}
    <div class="page-name">
      <span class="title">Current page:</span>
      <span class="name">
        {currentPage?.name} - {currentPage?.path}
      </span>
    </div>
  {/if}

  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  .layout {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }

  .head {
    display: flex;
    align-items: center;
    // gap: 20px;
    height: 32px;
  }

  .links {
    display: flex;
    gap: 10px;
    background-color: rgb(224 242 254);
    padding-inline: 20px;
    border-radius: 8px;

    .link {
      height: 28px;
      margin-block: 3px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      transition: 0.2s ease all;
      color: hsl(0 0% 10%);

      &:hover {
        background-color: rgb(186 230 253);
        color: inherit;
      }

      &.active {
        font-weight: 600;
        background-color: var(--accent-light);
        color: var(--accent-lighter);
      }
    }
  }

  .navigation,
  .page-name .title {
    font-weight: 600;
    width: 100px;
    display: inline-block;
  }

  a.link,
  a:visited {
    text-decoration: none;
  }

  .content {
    margin-top: 30px;
  }
</style>
