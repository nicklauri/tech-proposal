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
  class={twMerge("lucide lucide-loader-2", cn)}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
>
