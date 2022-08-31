import { Router } from "express";
import userController from "src/controllers/user.controller";

const userRouter = Router();

userRouter
  .get("/profile", userController.getProfile)
  .put("/profile", userController.updateProfile);

export default userRouter;
