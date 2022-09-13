import keyResultController from 'src/controllers/key-result.controller';
import keyResultMiddleware from 'src/middleware/key-result.middleware';
import { Router } from "express";
import objectiveController from "src/controllers/objective.controller";
import objectiveMiddleware from "src/middleware/objective.middleware";
import keyResultRouter from "src/routes/key-result.router";

const objectiveRouter = Router();

objectiveRouter
  .post("/", objectiveMiddleware.checkCreate, objectiveController.create)
  .get("/", objectiveController.getAll)
  .get("/:objectiveId", objectiveController.getOne)
  .delete("/:objectiveId", objectiveController.delete)
  .put("/:objectiveId", objectiveController.update)
  // .use("/:objectiveId/key-result", keyResultRouter)
  .post('/:objectiveId/key-results', keyResultMiddleware.checkValidObjectiveId, keyResultMiddleware.createKeyResult, keyResultController.createKeyResult)
  .get('/:objectiveId/key-results', keyResultMiddleware.checkValidObjectiveId, keyResultController.getAllKeyResults)



export default objectiveRouter;
