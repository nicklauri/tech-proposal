<script lang="ts">
  import { twMerge } from "tailwind-merge"

  let cn: string | undefined = undefined

  export { cn as class }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  class={twMerge(cn, "lucide lucide-info")}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg
>
