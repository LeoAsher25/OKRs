import mongoose from "mongoose";
import { ObjectiveDto } from "src/types/objective.type";
import { KeyResultSchema } from "./KeyResult.model";

export const ObjectiveSchema = new mongoose.Schema<ObjectiveDto>(
  {
    name: String,
    type: String,
    description: String,
    deadline: Date,
    progress: Number,
    keyResults: [KeyResultSchema],
  },
  {
    timestamps: true,
  }
);

const Objective = mongoose.model("Objective", ObjectiveSchema);

export default Objective;
