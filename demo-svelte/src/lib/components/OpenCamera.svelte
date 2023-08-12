<script lang="ts">
  import CameraIcon from "$lib/icons/CameraIcon.svelte"
  import type { CameraData } from "$lib/types/camera"

  let savedData: CameraData = { state: "empty" }

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

  $: console.log(`savedImagePath:`, savedData)
</script>

<div class="main">
  <div class="buttons group-ctrl">
    <button class="open-cam primary" on:click={takePictureAndDisplay}>
      <CameraIcon />
      Take a selfie and display!
    </button>

    <button class="open-cam" on:click={takePictureOnly}>
      <CameraIcon />
      Take a selfie and save!
    </button>
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

    .buttons {
      display: flex;
      // gap: 10px;
    }
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
