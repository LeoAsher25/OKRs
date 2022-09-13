import Objective from "src/models/objective.model";
import { KeyResultRequestData, ObjectiveDto } from "src/types/objective.type";

const keyResultServices = {
  async create(objective: ObjectiveDto, data: KeyResultRequestData) {
    try {
      const updatedObjective = await Objective.findOneAndUpdate({
        _id: objective._id,
      },
        {
          keyResults: [...objective.keyResults, data]
        }).lean()
      return updatedObjective
    }
    catch (err) {
      throw err
    }
  },

}

export default keyResultServices;