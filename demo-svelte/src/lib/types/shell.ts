export class JavascriptServiceResultModel<T> extends Promise<T> {
  IsSuccess: boolean;
  Data!: T;
  ErrorMessage: string;
  ErrorCode: number;
  NewAccessToken: string;
  NewRefreshToken: string;

  constructor(executor: (resolve: (value: T) => void) => void) {
    super(executor);
    this.IsSuccess = false;
    this.ErrorMessage = '';
    this.ErrorCode = 0;
    this.NewAccessToken = '';
    this.NewRefreshToken = '';
  }
}

export type ShellTakePictureAsBytes = { fileContent: string; originalFileName: string }
