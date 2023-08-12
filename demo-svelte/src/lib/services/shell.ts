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

const initShell = async (reinit = false) => {
  if (!reinit && Shell) {
    return Shell
  }

  const webViewObj = getWebviewObj()

  shellPostMessage(ShellMessage.pushJavascript, webViewObj)

  return new Promise<LocalDeviceService>(async (resolve) => {
    await sleepAsync(500)
    const deviceService = OnixToolStoreV2?.Shell.JavascriptService.LocalDeviceService ?? null
    Shell = new LocalDeviceService(deviceService)
    resolve(Shell)
  })
}

const updateShellCallback =
  (event: string, pred: (list: Set<ShellToSvelteCallback>) => Set<ShellToSvelteCallback>) =>
  (map: SvelteShellCallbackMap) => {
    const callbackList = map.get(event) ?? new Set()

    map.set(event, pred(callbackList))

    return map
  }

const registerShellCallback = (event: string, callback: ShellToSvelteCallback) => {
  shellCallbacks.update(updateShellCallback(event, (list) => list.add(callback)))
}

const unregisterShellCallback = (event: string, callback: ShellToSvelteCallback) => {
  shellCallbacks.update(
    updateShellCallback(event, (list) => {
      list.delete(callback)
      return list
    })
  )
}

const invokeShellCallback = (event: string, ...args: any[]) => {
  const shellCbList = get(shellCallbacks).get(event) ?? []

  shellCbList.forEach((cb) => cb(...args))
}

export class LocalDeviceService extends BaseShellService<DeviceService> {
  get service() {
    if (!this.hybridService) {
      console.warn("The hybrid service is not initialized!")
      initShell(true)
    }
    return this.hybridService
  }

  constructor(srv: DeviceService | null) {
    super(srv)
  }

  takePictureAsync(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.service?.TakePictureAsync((result) => {
        this.handleResult(reject, resolve, result)
      })
    })
  }

  takePictureAsBytesAsync(): Promise<ShellTakePictureAsBytes> {
    return new Promise((resolve, reject) => {
      this.service?.TakePictureAsBytesAsync((result) => {
        this.handleResult(reject, resolve, result)
      })
    })
  }

  getShellInfoAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service?.GetShellInfoAsync((result: JavascriptServiceResultModel<any>) => {
        this.handleResult<any>(reject, resolve, result)
      })
    })
  }

  // helloAsync(name: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     this.service?.HelloAsync(name, (result: JavascriptServiceResultModel<any>) => {
  //       this.handleResult<string>(reject, resolve, result)
  //     })
  //   })
  // }

  isWatchFileOnAsync(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.service?.IsWatchFileOnAsync((result) => {
        this.handleResult(reject, resolve, result)
      })
    })
  }

  startWatchFileAsync(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.service?.StartWatchFileAsync(path, (result) => {
        this.handleResult(reject, resolve, result)
      })
    })
  }

  stopWatchFileAsync(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.service?.StopWatchFileAsync((result) => {
        this.handleResult(reject, resolve, result)
      })
    })
  }

  initService(): void {}
}

export {
  initShell,
  getWebviewObj,
  shellPostMessage,
  registerShellCallback,
  unregisterShellCallback,
  invokeShellCallback,
}
