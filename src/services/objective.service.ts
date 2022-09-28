import objectiveError from 'src/helpers/objective-error';
import Objective from 'src/models/objective.model';
import { LoginSessionInfo } from 'src/types/auth.type';
import { RequestQuery } from 'src/types/common.type';
import { ObjectiveRequestData } from 'src/types/objective.type';

const objectiveService = {
  async getAll(user: LoginSessionInfo, query: RequestQuery) {
    query.page = query.page ? Number(query.page) - 1 : 0;
    query.pageSize = query.pageSize ? Number(query.pageSize) : 10;
    try {
      return await Objective.aggregate([
        {
          $skip: query.pageSize * query.page
        },
        {
          $limit: query.pageSize
        },
        {
          $match: {
            userId: user._id,
            name: {
              $regex: new RegExp((query.name as string) || /\s*/g)
            },
            type: {
              $regex: new RegExp((query.type as string) || /\s*/)
            }
          }
        },
        {
          $project: {
            userId: 0,
            __v: 0,
            keyResults: 0 // ???
          }
        }
      ]);
    } catch (err) {
      throw err;
    }
  },

  async create(data: ObjectiveRequestData, user: LoginSessionInfo) {
    try {
      const objective = {
        ...data,
        userId: user._id
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
  }
};

export default objectiveService;
