<script lang="ts">
  import Shell from "$lib/stores/shell";
  import type { CameraData } from "$lib/types/camera";

  let savedData: CameraData = { state: "empty" }

  const takePictureOnly = async () => {
    const path = await $Shell.takePictureAsync()

    if (!path) { return }

    savedData = {
      state: "picOnly",
      path,
    }
  }

  const takePictureAndDisplay = async () => {
    const data = await $Shell.takePictureAsBytesAsync()
    
    if (!data) { return }

    savedData = {
      state: "displayable",
      originalFileName: data.originalFileName,
      fileContent: 'data:image/jpeg;base64,' + data.fileContent,
    }
  }

  $: console.log(`savedImagePath:`, savedData)
</script>

<div class="main">
  <div class="buttons group-ctrl">
    <button class="open-cam primary" on:click={takePictureAndDisplay}>
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
        class="lucide lucide-camera"
        ><path
          d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
        /><circle cx="12" cy="13" r="3" /></svg
      >
      Take a selfie and display!
    </button>

    <button class="open-cam" on:click={takePictureOnly}>
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
        class="lucide lucide-camera"
        ><path
          d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
        /><circle cx="12" cy="13" r="3" /></svg
      >
      Take a selfie and save!
    </button>
  </div>
  
  {#if savedData.state == "picOnly"}
    <div class="result code">
      <div class="info">
        File name:
      </div>
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
    <div class="result empty">
      Let's take a selfie!
    </div>
  {/if}
</div>

<style lang="scss">
  .main, .result {
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
