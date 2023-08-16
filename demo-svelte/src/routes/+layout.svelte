<script context="module" lang="ts">
  initGlobalVars()
  ;(async () => {
    Shell = await initShell(true)
    shell.set(Shell)

    unregisterShellCallback(ShellEvent.Log, shellLog)
    registerShellCallback(ShellEvent.Log, shellLog)
  })()
</script>

<script lang="ts">
  import { ApplicationInsights } from '@microsoft/applicationinsights-web'
  import "../app.postcss"
  import "$assets/css/global.scss"
  import Urls from "$lib/consts/url"
  import { navigating, page } from "$app/stores"
  import {
    initShell,
    registerShellCallback,
    unregisterShellCallback,
  } from "$lib/services/shell"
  import { shell } from "$lib/stores/shell"
  import { initGlobalVars } from "$lib/utils/global-vars"
  import UrlNav from "$lib/components/UrlNav.svelte"
  import { ShellEvent } from "$lib/enums/shell-event"
  import { shellLog } from "$lib/utils/debug"
  import { goto } from "$app/navigation"
  import { fade, type FadeParams } from "svelte/transition"

  const urls = Object.entries(Urls).map(([_name, url]) => url)

  let currentPage
  $: {
    currentPage = urls.find((u) => u.path === $page.route.id)

    if (currentPage?.requireShell && !$shell) {
      goto(Urls.home.path)
    }
  }

  const fadeOptions: FadeParams = {
    duration: 100,
  }
</script>

<div class="pb-0">
  <UrlNav class="px-4" style="underline">
    <div
      class="w-[1050px] h-[570px] overflow-hidden flex items-center justify-center m-auto"
    >
      <div
        transition:fade={fadeOptions}
        class="rounded-lg shadow-md px-4 pb-4 w-[1030px] h-[540px] flex flex-col"
      >
        <slot />
      </div>
    </div></UrlNav
  >
</div>
