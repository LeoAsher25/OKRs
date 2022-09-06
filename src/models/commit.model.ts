import mongoose from "mongoose";
import { CommitDto } from "src/types/objective.type";

export const CommitSchema = new mongoose.Schema<CommitDto>(
  {
    message: String,
    progress: Number,
  },
  {
    timestamps: true,
  }
);

const Commit = mongoose.model("Commit", CommitSchema);
export default Commit;
