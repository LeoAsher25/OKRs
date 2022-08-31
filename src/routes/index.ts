import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import "src/middleware/passport";
import passport from "passport";
import objectiveRouter from "./objective.router";

const protectedRouter = Router();

protectedRouter.use("/users", userRouter).use("/objectives", objectiveRouter);

const mainRouter = Router();
mainRouter
  .use("/auth", authRouter)
  .use("/", passport.authenticate("jwt", { session: false }), protectedRouter);

export default mainRouter;
