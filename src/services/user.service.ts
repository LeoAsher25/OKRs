import User from "src/models/user.model";
import { UserUpdateData } from "src/types/user.type";

const userService = {
  async updateProfile(user: UserUpdateData, _id: string) {
    try {
      console.log("data: ", user, _id);
      const newUser = await User.findOneAndUpdate(
        {
          _id,
        },
        user
      );
      console.log("user: ", newUser);
      return newUser;
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
