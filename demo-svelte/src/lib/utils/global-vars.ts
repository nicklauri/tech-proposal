import { LocalDeviceService, invokeShellCallback } from "$lib/services/shell"

export const initGlobalVars = () => {
  const w = window as any

  w.Shell = new LocalDeviceService(null)

  w.invokeShellCallback = invokeShellCallback
}
