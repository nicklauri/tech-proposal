import type { JavascriptServiceResultModel, ShellTakePictureAsBytes } from "./shell"

declare global {
  type Chrome = {
    webview: {
      postMessage: (message: string) => void,
    } 
  }

  var chrome: Chrome | undefined

  type OnixToolStoreV2Service = {
    Shell: {
      JavascriptService: {
        LocalDeviceService: DeviceService,
      }
    }
  }

  var OnixToolStoreV2: OnixToolStoreV2Service | undefined

  type ShellCallback<T> = (result: JavascriptServiceResultModel<T>) => void

  type DeviceService = {
    GetShellInfoAsync(callback: ShellCallback<any>): void,
    TakePictureAsync(callback: ShellCallback<string>): void,
    TakePictureAsBytesAsync(callback: ShellCallback<ShellTakePictureAsBytes>): void,
    // HelloAsync(name: string, callback: ShellCallback<string>): void,
  }
}

export {}
