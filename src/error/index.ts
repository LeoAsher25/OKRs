import { ErrorCodes } from "src/types/status-code.enum";

export class OkrError extends Error {
  public status: number | undefined;
  public code: string | undefined;
  public constructor(status: number, code: ErrorCodes, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
interface ErrorResponse {
  code: string;
  message: string;
}

export const ErrorResponse = (code: string, message: string): ErrorResponse => {
  return {
    code,
    message: message,
  };
};
