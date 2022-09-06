import { Router } from "express";
import objectiveController from "src/controllers/objective.controller";
import objectiveMiddleware from "src/middleware/objective.middleware";

const objectiveRouter = Router();

objectiveRouter
  .post("/", objectiveMiddleware.checkCreate, objectiveController.create)
  .get("/", objectiveController.getAll)
  .get("/:id", objectiveController.getOne)
  .delete("/:id", objectiveController.delete);

export default objectiveRouter;
