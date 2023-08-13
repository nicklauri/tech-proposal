<script lang="ts">
  import CameraIcon from "$lib/icons/CameraIcon.svelte"
  import type { CameraData } from "$lib/types/camera"
  import { Button, ButtonGroup, Radio } from "flowbite-svelte"
  import LucideIcon from "../icons/LucideIcon.svelte"
  import Layout from "../../routes/+layout.svelte"
  import DemoInfo from "./DemoInfo.svelte"

  let savedData: CameraData = { state: "empty" }
  let picMode: Exclude<CameraData["state"], "empty"> = "displayable"

  const takePictureOnly = async () => {
    const path = await Shell.takePictureAsync()

    if (!path) {
      return
    }

    savedData = {
      state: "picOnly",
      path,
    }
  }

  const takePictureAndDisplay = async () => {
    const data = await Shell.takePictureAsBytesAsync()

    if (!data?.fileContent) {
      return
    }

    savedData = {
      state: "displayable",
      originalFileName: data.originalFileName,
      fileContent: "data:image/jpeg;base64," + data.fileContent,
    }
  }

  const takePicture = async () => {
    switch (picMode) {
      case "displayable":
        takePictureAndDisplay()
        break
      case "picOnly":
        takePictureOnly()
        break
    }
  }

  $: console.log(`savedImagePath:`, savedData)
</script>

<div class="main">
  <DemoInfo>
    This demonstration shows the capabilities of communication from <strong>frontend</strong> to <strong>shell</strong>.
    <br />
    The frontend (Svelte) calls the <code>takePictureAsync</code> from shell (Webview2) and processes the data.
  </DemoInfo>

  <div class="flex gap-4">
    <Button class="flex gap-2 shadow-md py-1" color="primary" on:click={takePicture}>
      <CameraIcon class="text-[16px]" />
      Take a picture!
    </Button>

    <Radio bind:group={picMode} value={"displayable"}>Display picture</Radio>

    <Radio bind:group={picMode} value={"picOnly"}>Save picture</Radio>
  </div>

  {#if savedData.state == "picOnly"}
    <div class="result code">
      <div class="info">File name:</div>
      <span class="code">
        {savedData.path}
      </span>
    </div>
  {:else if savedData.state === "displayable"}
    <div class="result">
      <div class="info">
        <span>File name:</span>
        <span class="code">
          {savedData.originalFileName}
        </span>
      </div>
      <div class="img">
        <img width="300" src={savedData.fileContent} alt={savedData.originalFileName} />
      </div>
    </div>
  {:else}
    <div class="result empty">Let's take a selfie!</div>
  {/if}
</div>

<style lang="scss">
  .main,
  .result {
    display: flex;
    flex-direction: column;
  }

  .main {
    gap: 10px;
  }

  .result {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .code {
    font-family: Consolas;
  }

  img {
    border-radius: var(--border-radius);
    box-shadow: var(--btn-shadow);
  }
</style>
