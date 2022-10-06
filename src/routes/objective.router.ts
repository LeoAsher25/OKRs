import keyResultController from 'src/controllers/key-result.controller';
import keyResultMiddleware from 'src/middleware/key-result.middleware';
import { Router } from 'express';
import objectiveController from 'src/controllers/objective.controller';
import objectiveMiddleware from 'src/middleware/objective.middleware';
import keyResultRouter from 'src/routes/key-result.router';

const objectiveRouter = Router({
  mergeParams: true
});

objectiveRouter
  .post('/', objectiveMiddleware.checkRequestData, objectiveController.create)
  .get('/', objectiveController.getMany)
  .get('/:objectiveId', objectiveController.getOne)
  .delete('/:objectiveId', objectiveController.delete)
  .put('/:objectiveId', objectiveMiddleware.checkRequestData, objectiveController.update)
  .use('/:objectiveId/key-results', objectiveMiddleware.checkValidObjectiveId, keyResultRouter);
// .post('/:objectiveId/key-results', keyResultMiddleware.checkValidObjectiveId, keyResultMiddleware.checkRequestData, keyResultController.createKeyResult)
// .get('/:objectiveId/key-results', keyResultMiddleware.checkValidObjectiveId, keyResultController.getManyKeyResults)
// .get('/:objectiveId/key-results/:krId', keyResultMiddleware.checkValidObjectiveId, keyResultMiddleware.checkGetOneKeyResult, keyResultController.getOneKeyResult)
// .put('/:objectiveId/key-results/:krId', keyResultMiddleware.checkValidObjectiveId, keyResultMiddleware.checkRequestData, keyResultController.updateKeyResult)
// .delete('/:objectiveId/key-results/:krId', keyResultMiddleware.checkValidObjectiveId, keyResultController.deleteKeyResult)

export default objectiveRouter;
