<script>
  import InfoIcon from "$lib/icons/InfoIcon.svelte"
  import { Alert } from "flowbite-svelte"
</script>

<Alert color="blue" class="text-[12px] py-2">
  <div class="flex gap-2">
    <div class="items-center flex">
      <InfoIcon class="inline-block text-[20px]" />
    </div>

    <div class="items-center flex min-h-[36px]">
      <div class="div">
        <slot />
      </div>
    </div>
  </div>
</Alert>
