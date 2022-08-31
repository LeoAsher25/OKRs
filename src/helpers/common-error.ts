import { OkrError } from "src/error";
import { ErrorCodes, StatusCodes } from "src/types/status-code.enum";

const commonError = {
  requireFields: new OkrError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Fill in required entry fields"
  ),
  invalidDate: new OkrError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Invalid date"
  ),
};
export default commonError;
