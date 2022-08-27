import User from "src/models/User.model";
import { UserDto, UserSignUpData } from "src/types/user.type";
import bcrypt from "bcryptjs";

const authServices = {
  async signUp(user: UserSignUpData): Promise<UserDto> {
    try {
      try {
        // generate a salt
        const salt = await bcrypt.genSalt(10);
        // generate a password hash (salt + hash)
        const passwordHashed = await bcrypt.hash(user.password, salt);
        // re-assign password hashed
        user.password = passwordHashed;
      } catch (error) {
        throw error;
      }
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      throw err;
    }
  },
};

export default authServices;
