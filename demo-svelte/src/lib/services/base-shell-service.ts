import type { JavascriptServiceResultModel } from "$lib/types/shell"

export class ShellServiceError extends Error {
  code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

export abstract class BaseShellService<T> {
  hybridService: T | null
  // eslint-disable-next-line @typescript-eslint/naming-convention
  //public onShellRefreshedToken = new Subject<{ access_token: string refresh_token: string }>()

  constructor(srv: T | null) {
    this.hybridService = srv
  }

  protected handleResult<T>(reject: (err: Error) => void, resolve: (value: T) => void, result: JavascriptServiceResultModel<T>): void {
    if (result && result.IsSuccess) {
      // if (result.NewAccessToken && result.NewRefreshToken) {
      //   // eslint-disable-next-line @typescript-eslint/naming-convention
      //   this.onShellRefreshedToken.next({ access_token: result.NewAccessToken, refresh_token: result.NewRefreshToken })
      // }
      resolve(result.Data)
    } else {
      // Should be check unauthorize 401 from shell then get and action
      const err = new ShellServiceError(result.ErrorCode, result.ErrorMessage)
      reject(err)
    }
  }

  abstract initService(): void
}

