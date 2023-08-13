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
  import "../app.postcss"
  import "$assets/css/global.scss"
  import Urls from "$lib/consts/url"
  import { page } from "$app/stores"
  import { initShell, registerShellCallback, unregisterShellCallback } from "$lib/services/shell"
  import { shell } from "$lib/stores/shell"
  import { initGlobalVars } from "$lib/utils/global-vars"
  import UrlNav from "$lib/components/UrlNav.svelte"
  import { ShellEvent } from "$lib/enums/shell-event"
  import { shellLog } from "$lib/utils/debug"
  import { goto } from "$app/navigation"

  const urls = Object.entries(Urls).map(([_name, url]) => url)

  let currentPage
  $: {
    currentPage = urls.find((u) => u.path === $page.route.id)

    if (currentPage?.requireShell && !$shell) {
      goto(Urls.home.path)
    }
  }
</script>

<div class="p-4 pb-0">
  <UrlNav class="px-4" style="underline">
    <div class="rounded-lg shadow-lg px-4 pb-4 min-h-[540px] flex flex-col">
      <slot />
    </div>
  </UrlNav>
</div>
