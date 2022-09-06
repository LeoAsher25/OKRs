import { OkrError } from "src/error";
import objectiveError from "src/helpers/objective-error";
import Objective from "src/models/objective.model";
import { LoginSessionInfo } from "src/types/auth.type";
import { ObjectiveCreateData } from "src/types/objective.type";
import { ErrorCodes, StatusCodes } from "src/types/status-code.enum";

const objectiveService = {
  async getAll(user: LoginSessionInfo) {
    try {
      return await Objective.find({
        userId: user._id,
      }).lean();
    } catch (err) {
      throw err;
    }
  },

  async create(data: ObjectiveCreateData, user: LoginSessionInfo) {
    try {
      const objective = {
        ...data,
        userId: user._id,
      };
      const response = await Objective.create(objective);
      return response;
    } catch (err) {
      throw err;
    }
  },

  async getOne(_id: string) {
    try {
      const response = await Objective.findOne({ _id });
      if (!response) {
        throw objectiveError.objectiveNotFound;
      } else return response;
    } catch (err) {
      throw err;
    }
  },
};

export default objectiveService;
