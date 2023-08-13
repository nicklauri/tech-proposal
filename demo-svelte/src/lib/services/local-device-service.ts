import type { JavascriptServiceResultModel, ShellTakePictureAsBytes } from "$lib/types/shell"
import { BaseShellService } from "./base-shell-service"
import { initShell } from "./shell"

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
