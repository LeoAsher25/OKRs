export interface UserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: Date;
  address: String;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserSignUpData = Pick<
  UserDto,
  "email" | "password" | "firstName" | "lastName"
>;
