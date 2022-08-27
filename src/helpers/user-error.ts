import { OkrError } from "src/error";
import { ErrorCodes, StatusCodes } from "src/types/status-code.enum";

const userError = {
  emailIsInUse: new OkrError(
    StatusCodes.CONFLICT,
    ErrorCodes.CONFLICT,
    "Email is already in use"
  ),
  emailIsInvalid: new OkrError(
    StatusCodes.NOT_FOUND,
    ErrorCodes.NOT_FOUND,
    "Email is invalid"
  ),
  requireFields: new OkrError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Fill in required entry fields"
  ),
};
export default userError;
