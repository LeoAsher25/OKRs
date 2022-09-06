import { OkrError } from "src/error";
import { ErrorCodes, StatusCodes } from "src/types/status-code.enum";

const userError = {
  requireFields: new OkrError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Fill in required entry fields"
  ),
  emailIsInUse: new OkrError(
    StatusCodes.CONFLICT,
    ErrorCodes.CONFLICT,
    "Email is already in use"
  ),
  emailIsInvalid: new OkrError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Email is invalid"
  ),

  emailIsIncorrect: new OkrError(
    StatusCodes.UNAUTHORIZED,
    ErrorCodes.UNAUTHORIZED,
    "Email does not belong to any account"
  ),

  passwordIsInvalid: new OkrError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Password "
  ),

  passwordIsIncorrect: new OkrError(
    StatusCodes.UNAUTHORIZED,
    ErrorCodes.UNAUTHORIZED,
    "Password is incorrect"
  ),

  noToken: new OkrError(
    StatusCodes.NOT_FOUND,
    ErrorCodes.NOT_FOUND,
    "No refresh token supplied!"
  ),

  invalidToken: new OkrError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Invalid refresh token!"
  ),

  invalidPhoneNumber: new OkrError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Invalid phone number"
  ),
};
export default userError;
