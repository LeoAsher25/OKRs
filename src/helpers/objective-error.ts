import { OkrError } from 'src/error';
import { ErrorCodes, StatusCodes } from 'src/types/status-code.enum';

const objectiveError = {
  isExistedName: new OkrError(StatusCodes.CONFLICT, ErrorCodes.CONFLICT, "Objective's name is already exists"),
  isExistedDescription: new OkrError(
    StatusCodes.CONFLICT,
    ErrorCodes.CONFLICT,
    "Objective's description is already exists"
  ),

  typeIsInvalid: new OkrError(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, 'Objective type is invalid'),

  objectiveNotFound: new OkrError(StatusCodes.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Objective not found'),

  keyResultNotFound: new OkrError(StatusCodes.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Key result not found'),

  commitNotFound: new OkrError(StatusCodes.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Key result not found'),

  progressIsInvalid: new OkrError(
    StatusCodes.NOT_FOUND,
    ErrorCodes.NOT_FOUND,
    'Progress have to be a number between 0 and 100'
  ),

  commitMessageIsRequired: new OkrError(StatusCodes.NOT_FOUND, ErrorCodes.NOT_FOUND, "Commit's message is required!")
};

export default objectiveError;
