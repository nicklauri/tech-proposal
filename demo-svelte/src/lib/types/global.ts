import type { LocalDeviceService } from "$lib/services/shell"
import type { JavascriptServiceResultModel, ShellTakePictureAsBytes } from "./shell"

declare global {
  type Chrome = {
    webview: {
      postMessage: (message: string) => void
    }
  }

  var chrome: Chrome | undefined

  type OnixToolStoreV2Service = {
    Shell: {
      JavascriptService: {
        LocalDeviceService: DeviceService
      }
    }
  }

  var OnixToolStoreV2: OnixToolStoreV2Service | undefined
  var Shell: LocalDeviceService

  type ShellCallback<T> = (result: JavascriptServiceResultModel<T>) => void

  type DeviceService = {
    GetShellInfoAsync(callback: ShellCallback<any>): void
    TakePictureAsync(callback: ShellCallback<string>): void
    TakePictureAsBytesAsync(callback: ShellCallback<ShellTakePictureAsBytes>): void
    IsWatchFileOnAsync(callback: ShellCallback<boolean>): void
    StartWatchFileAsync(path: string, callback: ShellCallback<boolean>): void
    StopWatchFileAsync(callback: ShellCallback<boolean>): void
    // HelloAsync(name: string, callback: ShellCallback<string>): void,
  }
}

export {}
