import objectiveError from "src/helpers/objective-error";
import Objective from "src/models/objective.model";
import { LoginSessionInfo } from "src/types/auth.type";
import { ObjectiveRequestData } from "src/types/objective.type";

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

  async create(data: ObjectiveRequestData, user: LoginSessionInfo) {
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
      const response = await Objective.findOne({ _id }).lean();
      if (!response) {
        throw objectiveError.objectiveNotFound;
      }
      return response;
    } catch (err) {
      throw err;
    }
  },

  async delete(_id: string) {
    try {
      const response = await Objective.findOneAndDelete({ _id }).lean();
      if (!response) {
        throw objectiveError.objectiveNotFound;
      }
      return response;
    } catch (err) {
      throw err;
    }
  },

  async update(data: ObjectiveRequestData, _id: string) {
    try {
      const response = await Objective.findOneAndUpdate({ _id }, data).lean();
      if (!response) {
        throw objectiveError.objectiveNotFound;
      }
      return { ...response, ...data };
    } catch (err) {
      throw err;
    }
  },
};

export default objectiveService;
