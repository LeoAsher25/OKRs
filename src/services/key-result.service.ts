import Objective from 'src/models/objective.model';
import { KeyResultRequestData, ObjectiveDto } from 'src/types/objective.type';

const keyResultServices = {
  async create(objective: ObjectiveDto, data: KeyResultRequestData) {
    try {
      const keyResults = [...objective.keyResults, data];
      const updatedObjective = await Objective.findOneAndUpdate(
        {
          _id: objective._id
        },
        {
          keyResults
        }
      ).lean();
      return updatedObjective;
    } catch (err) {
      throw err;
    }
  },

  async update(objective: ObjectiveDto, data: KeyResultRequestData, krId: string) {
    try {
      const keyResults = objective.keyResults.map(kr => {
        return kr._id != krId
          ? kr
          : {
              ...kr,
              ...data
            };
      });
      const updatedObjective = await Objective.findOneAndUpdate(
        {
          _id: objective._id
        },
        {
          keyResults
        }
      ).lean();
      return updatedObjective;
    } catch (err) {
      throw err;
    }
  },

  // async updateProgess(objective: ObjectiveDto, progress: number, krId: string) {
  //   const newObjective = {
  //     ...objective,
  //     keyResults: objective.keyResults.map(kr => {
  //       return kr._id != krId
  //         ? kr
  //         : {
  //             ...kr,
  //             progress
  //           };
  //     })
  //   };

  //   const numberKrDone = newObjective.keyResults.reduce(
  //     (currentCount, currentEle) => (currentCount += currentEle.progress === 100 ? 1 : 0),
  //     0
  //   );
  //   const newObjProgress = (numberKrDone * 100) / newObjective.keyResults.length;

  //   try {
  //     const updatedObjective = await Objective.findOneAndUpdate(
  //       {
  //         _id: objective._id
  //       },
  //       {
  //         ...newObjective,
  //         progress: newObjProgress
  //       }
  //     ).lean();
  //     return updatedObjective;
  //   } catch (err) {
  //     throw err;
  //   }
  // },

  async delete(objective: ObjectiveDto, krId: string) {
    try {
      const keyResults = objective.keyResults.filter(kr => kr._id != krId);
      const updatedObjective = await Objective.findOneAndUpdate(
        {
          _id: objective._id
        },
        {
          keyResults
        }
      ).lean();
      return updatedObjective;
    } catch (err) {
      throw err;
    }
  }
};

export default keyResultServices;
