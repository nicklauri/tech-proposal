<script lang="ts">
  import { twMerge } from "tailwind-merge"

  let cn: string | undefined = undefined

  export { cn as class }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  class={twMerge(cn, "lucide lucide-play")}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
>
