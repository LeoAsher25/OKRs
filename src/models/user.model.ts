import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import { UserDto } from 'src/types/user.type';

export const UserSchema = new Schema<UserDto>(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Password is required!']
    },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    dob: {
      type: Date
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', UserSchema);
export default User;
