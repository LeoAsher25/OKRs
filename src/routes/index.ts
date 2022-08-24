import { Router } from "express";
import rootPath from "src/constants/root-path";
import authRouter from "./auth.router";

const protectedRouter = Router();

const mainRouter = Router();
mainRouter
  .use("/auth", authRouter)
  .use("/", protectedRouter)
  .use("/", (req, res) => {
    console.log("rootPath: ", rootPath);
    res.send("Hello world");
  });

export default mainRouter;
