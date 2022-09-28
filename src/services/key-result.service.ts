import Objective from 'src/models/objective.model';
import { KeyResultRequestData, ObjectiveDto } from 'src/types/objective.type';

const keyResultServices = {
  async create(objective: ObjectiveDto, data: KeyResultRequestData) {
    try {
      const updatedObjective = await Objective.findOneAndUpdate(
        {
          _id: objective._id
        },
        {
          keyResults: [...objective.keyResults, data]
        }
      ).lean();
      return updatedObjective;
    } catch (err) {
      throw err;
    }
  },

  async update(objective: ObjectiveDto, data: KeyResultRequestData, krId: string) {
    try {
      const updatedObjective = await Objective.findOneAndUpdate(
        {
          _id: objective._id
        },
        {
          keyResults: objective.keyResults.map(kr => {
            return kr._id != krId
              ? kr
              : {
                  ...kr,
                  ...data
                };
          })
        }
      ).lean();
      return updatedObjective;
    } catch (err) {
      throw err;
    }
  },

  async updateProgess(objective: ObjectiveDto, progress: number, krId: string) {
    const newObject = {
      ...objective,
      keyResults: objective.keyResults.map(kr => {
        return kr._id != krId
          ? kr
          : {
              ...kr,
              progress
            };
      })
    };

    const numberKrDone = newObject.keyResults.reduce(
      (currentCount, currentEle) => (currentCount += currentEle.progress === 100 ? 1 : 0),
      0
    );
    const newObjProgress = (numberKrDone * 100) / newObject.keyResults.length;
    // newObject.progress = newObjProgress;

    try {
      const updatedObjective = await Objective.findOneAndUpdate(
        {
          _id: objective._id
        },
        {
          ...newObject,
          progress: newObjProgress
        }
      ).lean();
      return updatedObjective;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  },

  async delete(objective: ObjectiveDto, krId: string) {
    try {
      const updatedObjective = await Objective.findOneAndUpdate(
        {
          _id: objective._id
        },
        {
          keyResults: objective.keyResults.filter(kr => kr._id != krId)
        }
      ).lean();
      return updatedObjective;
    } catch (err) {
      throw err;
    }
  }
};

export default keyResultServices;
