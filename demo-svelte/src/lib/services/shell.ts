import type { JavascriptServiceResultModel, ShellTakePictureAsBytes, ShellToSvelteCallback } from "$lib/types/shell"
import { ShellMessage } from "$lib/consts/shell-message"
import { sleepAsync } from "$lib/utils/time"
import { BaseShellService } from "$lib/services/base-shell"
import { shellCallbacks, type SvelteShellCallbackMap } from "$lib/stores/shell"
import { get } from "svelte/store"

const getWebviewObj = () => chrome?.webview

const shellPostMessage = (message: string | ShellMessage, webviewObj?: Chrome["webview"]) => {
  webviewObj ??= getWebviewObj()

  if (!webviewObj) {
    // TODO: use warn debug.
    console.warn(`webview is undefined`)
    return
  }

  webviewObj.postMessage(message)
}

const initShell = () => {
  const webViewObj = getWebviewObj()

  shellPostMessage(ShellMessage.pushJavascript, webViewObj)

  return new Promise<LocalDeviceService>(async (resolve) => {
    await sleepAsync(500)
    const deviceService = OnixToolStoreV2?.Shell.JavascriptService.LocalDeviceService ?? null
    resolve(new LocalDeviceService(deviceService))
  })
}

const updateShellCallback = (event: string, pred: (list: Set<ShellToSvelteCallback>) => Set<ShellToSvelteCallback>) =>
  (map: SvelteShellCallbackMap) => {
    const callbackList = map.get(event) ?? new Set()

    map.set(event, pred(callbackList))

    return map
  }

const registerShellCallback = (event: string, callback: ShellToSvelteCallback) => {
  shellCallbacks.update(updateShellCallback(event, list => list.add(callback)))
}

const unregisterShellCallback = (event: string, callback: ShellToSvelteCallback) => {
  shellCallbacks.update(updateShellCallback(event, list => {
    list.delete(callback)
    return list
  }))
}

const invokeShellCallback = (event: string, ...args: any[]) => {
  const shellCbList = get(shellCallbacks).get(event) ?? []

  shellCbList.forEach(cb => cb(...args))
}

export class LocalDeviceService extends BaseShellService<DeviceService> {
  constructor(srv: DeviceService | null) {
    super(srv)
  }

  takePictureAsync(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.hybridService?.TakePictureAsync((result: JavascriptServiceResultModel<string>) => {
        this.handleResult<string>(reject, resolve, result)
      })
    })
  }

  takePictureAsBytesAsync(): Promise<ShellTakePictureAsBytes> {
    return new Promise<ShellTakePictureAsBytes>((resolve, reject) => {
      this.hybridService?.TakePictureAsBytesAsync((result: JavascriptServiceResultModel<ShellTakePictureAsBytes>) => {
        this.handleResult<ShellTakePictureAsBytes>(reject, resolve, result)
      })
    })
  }

  getShellInfoAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.hybridService?.GetShellInfoAsync((result: JavascriptServiceResultModel<any>) => {
        this.handleResult<any>(reject, resolve, result)
      })
    })
  }

  // helloAsync(name: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     this.hybridService?.HelloAsync(name, (result: JavascriptServiceResultModel<any>) => {
  //       this.handleResult<string>(reject, resolve, result)
  //     })
  //   })
  // }

  initService(): void { }
}

export {
  getWebviewObj,
  shellPostMessage,
  initShell,
  registerShellCallback,
  unregisterShellCallback,
  invokeShellCallback,
}
