import { readonly, writable } from "svelte/store"
import { LocalDeviceService, initShell } from "$lib/services/shell"

const _shellInternal = writable(new LocalDeviceService(null))
const _shellInfoPrivate = writable<any>(undefined)

setTimeout(async () => {
  const shell = await initShell()

  _shellInternal.set(shell)

  const shellInfo = await shell.getShellInfoAsync()

  _shellInfoPrivate.set(shellInfo)
}, 0)

const Shell = readonly(_shellInternal)
const ShellInfo = readonly(_shellInfoPrivate)

export default Shell
export { ShellInfo }
