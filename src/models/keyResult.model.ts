import mongoose from "mongoose";
import { KeyResultDto } from "src/types/objective.type";
import { CommitSchema } from "src/models/commit.model";

export const KeyResultSchema = new mongoose.Schema<KeyResultDto>(
  {
    name: String,
    description: String,
    deadline: Date,
    progress: Number,
    commits: [CommitSchema],
  },
  {
    timestamps: true,
  }
);

const KeyResult = mongoose.model("KeyResult", KeyResultSchema);
export default KeyResult;
