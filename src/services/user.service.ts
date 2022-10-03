import User from 'src/models/user.model';
import { UserUpdateData } from 'src/types/user.type';

const userService = {
  async updateProfile(user: UserUpdateData, _id: string) {
    try {
      const newUser = await User.findOneAndUpdate(
        {
          _id
        },
        user
      );
      return newUser;
    } catch (err) {
      throw err;
    }
  }
};

export default userService;
