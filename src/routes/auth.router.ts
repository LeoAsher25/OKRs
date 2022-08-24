import { Router } from "express";
import authController from "src/controllers/auth.controller";

const authRouter = Router();

authRouter.get("/sign-up", authController.handleSignUp);

export default authRouter;
