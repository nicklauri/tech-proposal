<script>
  export let title = "Message"
</script>

<div class="container">
  <div class="modal">
    <div class="header">
      <div class="h-title">{title}</div>
      <!-- <h class="actions"></h> -->
    </div>
    <div class="content">
      <slot />
    </div>

    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    > * {
      box-sizing: border-box;
    }

    position: fixed;
    z-index: 20;
    inset: 0;
    min-width: 100vw;
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: Inter, sans-serif;
    background-color: hsla(0, 0%, 50%, 0.2);
    color: var(--primary);

    .modal {
      display: flex;
      flex-direction: column;
      width: 500px;
      border: var(--border);
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
      // overflow: hidden;
      background-color: #fbfbfb;

      > * {
        padding: 10px;
      }

      > .header {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        position: relative;
        border-bottom: var(--border);

        .h-title {
          color: var(--accent);
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .h-actions {
          position: absolute;
          right: 10px;
        }
      }

      .content {
        font-size: 13px;
        height: 200px;

        > .content-head {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 3px;
        }
      }

      .footer {
        margin-top: auto;
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: flex-end;
        border-top: var(--border);
      }

      .text-field-group {
        display: flex;
        gap: 3px;
        margin-right: auto;

        > * {
          min-width: 0;
          width: 10%;
        }
      }

      #edit-company-id {
        flex-grow: 1;
      }

      #edit-company-alias {
        flex-grow: 3;
      }
    }

    &:not([data-component="spinner"]) > [data-component="spinner"] {
      visibility: hidden;
      display: none;
    }

    .odbg-dlg-container.odbg-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: auto;
    }

    .mr-auto {
      margin-right: auto;
    }

    .icon-btn {
      box-shadow: none;
      padding: 0;
      height: 100%;
    }

    .h-actions > .close-btn {
      font-size: 20px;
      padding: 3px;
      color: rgba(0 0 0 / 0.7);

      &:hover {
        color: rgba(0 0 0 / 0.9);
        background-color: var(--btn-secondary-hover-bg);
      }

      &:active {
        background-color: var(--btn-secondary-active-bg);
      }
    }
  }
</style>
