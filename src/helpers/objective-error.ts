import { OkrError } from "src/error";
import { ErrorCodes, StatusCodes } from "src/types/status-code.enum";

const objectiveError = {
  typeIsInvalid: new OkrError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Objective type is invalid"
  ),
};

export default objectiveError;
