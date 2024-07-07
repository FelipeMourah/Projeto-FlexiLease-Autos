export default class AppError extends Error {
  public readonly code: number;
  public readonly status: string;
  public readonly message: string;
  public readonly statusCode: number;
  public readonly details?: string[];

  constructor(
    code: number,
    status: string,
    message: string,
    statusCode = 400,
    details?: string[],
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.message = message;
    this.statusCode = statusCode;
    this.details = details || [];
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export { AppError };
