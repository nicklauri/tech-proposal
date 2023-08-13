<script lang="ts">
  import { twMerge } from "tailwind-merge"

  let cn: string | undefined = undefined

  export { cn as class }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={twMerge(cn, "lucide lucide-pause")}
  ><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></svg
>
