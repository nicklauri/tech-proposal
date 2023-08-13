import { LocalDeviceService } from "$lib/services/local-device-service"
import { invokeShellCallback } from "$lib/services/shell"

export const initGlobalVars = () => {
  const w = window as any

  w.Shell = new LocalDeviceService(null)

  w.invokeShellCallback = invokeShellCallback
}
