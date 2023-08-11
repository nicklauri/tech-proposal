import { readonly, writable } from "svelte/store"
import { LocalDeviceService, initShell, invokeShellCallback } from "$lib/services/shell"
import type { ShellToSvelteCallback } from "$lib/types/shell"

const _shellInternal = writable(new LocalDeviceService(null))
const _shellInfoPrivate = writable<any>(undefined)

export const _initShell = async () => {
  const shell = await initShell()

  _shellInternal.set(shell)

  const shellInfo = await shell.getShellInfoAsync()

  _shellInfoPrivate.set(shellInfo)

  const w = window as any
  w.invokeShellCallback = invokeShellCallback
}

const Shell = readonly(_shellInternal)

export const ShellInfo = readonly(_shellInfoPrivate)

export type SvelteShellCallbackMap = Map<string, Set<ShellToSvelteCallback>>

export const shellCallbacks = writable<SvelteShellCallbackMap>(new Map())

export default Shell
