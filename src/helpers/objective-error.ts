import { OkrError } from 'src/error';
import { ErrorCodes, StatusCodes } from 'src/types/status-code.enum';

const objectiveError = {
  typeIsInvalid: new OkrError(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, 'Objective type is invalid'),

  objectiveNotFound: new OkrError(StatusCodes.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Objective not found'),

  keyResultNotFound: new OkrError(StatusCodes.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Key result not found'),

  commitNotFound: new OkrError(StatusCodes.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Key result not found')
};

export default objectiveError;
