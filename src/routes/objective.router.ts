import { Router } from "express";
import objectiveController from "src/controllers/objective.controller";
import objectiveMiddleware from "src/middleware/objective.middleware";

const objectiveRouter = Router();

objectiveRouter
  .get("/", objectiveController.getAll)
  .post("/", objectiveMiddleware.checkCreate, objectiveController.create);

export default objectiveRouter;
