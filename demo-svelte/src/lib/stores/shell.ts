import { derived, readable, writable } from "svelte/store"
import { LocalDeviceService, initShell } from "$lib/services/shell"

setTimeout(() => initShell(), 0)
export const _shellInternal = writable(new LocalDeviceService(null))

const Shell = derived(_shellInternal, shell => shell)

const ShellInfo = readable(_shellInternal, set => {
  _shellInternal.subscribe(async sh => sh?.getShellInfoAsync().then(shellInfo => set(shellInfo)))
})

export default Shell

export {
  ShellInfo,
}
