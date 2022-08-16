import { Router } from "express";
import rootPath from "src/constants/root-path";

const protectedRouter = Router();

const mainRouter = Router();
mainRouter
  .use("/", (req, res) => {
    console.log("rootPath: ", rootPath);
    res.send("Hello world");
  })
  .use("/", protectedRouter);

export default mainRouter;
