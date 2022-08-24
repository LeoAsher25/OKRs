import { Prisma, User } from "@prisma/client";
import prisma from "src/config/prisma.config";

const authServices = {
  async signUp(user: Prisma.UserCreateInput): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: user,
      });
      return newUser;
    } catch (err) {
      throw err;
    }
  },
};
export default authServices;
