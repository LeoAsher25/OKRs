import { User } from "@prisma/client";

export type UserSignUpData = Pick<
  User,
  "email" | "password" | "firstName" | "lastName"
>;
