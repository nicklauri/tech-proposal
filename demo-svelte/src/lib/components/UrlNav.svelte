<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import Urls from "$lib/consts/url"
  import { TabItem, Tabs } from "flowbite-svelte"
  import type { ComponentProps } from "svelte"

  export let style: ComponentProps<Tabs>["style"] = "pill"

  let cn: ComponentProps<Tabs>["defaultClass"] = undefined

  export { cn as class }

  const urls = Object.entries(Urls).map(([_name, url]) => url)

  $: currentPage = urls.find((u) => u.path === $page.route.id)
</script>

<Tabs {style} class={cn}>
  {#each urls as nav}
    <TabItem open={$page.route.id === nav.path} on:click={() => goto(nav.path)} title={nav.name}>
      <slot />
    </TabItem>
  {/each}
</Tabs>
