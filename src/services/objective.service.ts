import Objective from "src/models/objective.model";
import { LoginSessionInfo } from "src/types/auth.type";
import { ObjectiveCreateData } from "src/types/objective.type";

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
};

export default objectiveService;
