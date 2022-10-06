import mongoose from 'mongoose';
import { ObjectiveDto } from 'src/types/objective.type';
import { KeyResultSchema } from './keyResult.model';

export const ObjectiveSchema = new mongoose.Schema<ObjectiveDto>(
  {
    name: String,
    type: String,
    description: String,
    deadline: Date,
    progress: Number,
    keyResults: [KeyResultSchema],
    userId: mongoose.Types.ObjectId
  },
  {
    timestamps: true
  }
);

const Objective = mongoose.model('Objective', ObjectiveSchema);
export default Objective;
