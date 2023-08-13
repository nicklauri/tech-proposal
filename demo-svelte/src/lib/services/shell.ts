import type { ShellToSvelteCallback } from "$lib/types/shell"
import { ShellMessage } from "$lib/consts/shell-message"
import { sleepAsync } from "$lib/utils/time"
import { shellCallbacks, type SvelteShellCallbackMap } from "$lib/stores/shell"
import { get } from "svelte/store"
import { LocalDeviceService } from "./local-device-service"

const getWebviewObj = () => chrome?.webview

const shellPostMessage = (message: string | ShellMessage, webviewObj?: Chrome["webview"]) => {
  webviewObj ??= getWebviewObj()

  if (!webviewObj) {
    console.warn(`webview is undefined`)
    return
  }

  webviewObj.postMessage(message)
}

const getLocalDeviceService = () => window.OnixToolStoreV2?.Shell.JavascriptService.LocalDeviceService ?? null

const initShell = async (reinit = false) => {
  if (!reinit && Shell) {
    return Shell
  }

  const webViewObj = getWebviewObj()

  shellPostMessage(ShellMessage.pushJavascript, webViewObj)

  return new Promise<LocalDeviceService>(async (resolve) => {
    await sleepAsync(500)
    Shell = new LocalDeviceService(getLocalDeviceService())
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

  console.log(`Shell callback: event:`, event, `| data:`, args, `| list`, shellCbList)

  shellCbList.forEach((cb) => cb(...args))
}

export {
  initShell,
  getWebviewObj,
  shellPostMessage,
  registerShellCallback,
  unregisterShellCallback,
  invokeShellCallback,
}
