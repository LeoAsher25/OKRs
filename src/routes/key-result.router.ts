import { Router } from 'express';
import keyResultController from 'src/controllers/key-result.controller';
import keyResultMiddleware from 'src/middleware/key-result.middleware';
import commitRouter from './commit.router';

const keyResultRouter = Router({
  mergeParams: true
});

keyResultRouter.post('/', keyResultMiddleware.checkRequestData, keyResultController.createKeyResult);
keyResultRouter.get('/', keyResultController.getManyKeyResults);
keyResultRouter.get('/:krId', keyResultMiddleware.checkGetOneKeyResult, keyResultController.getOneKeyResult);
keyResultRouter.put('/:krId', keyResultMiddleware.checkGetOneKeyResult, keyResultController.updateKeyResult);
// keyResultRouter.put(
//   '/:krId/progress',
//   keyResultMiddleware.checkGetOneKeyResult,
//   keyResultMiddleware.checkProgress,
//   keyResultController.updateProgress
// );
keyResultRouter.delete('/:krId', keyResultMiddleware.checkGetOneKeyResult, keyResultController.deleteKeyResult);
keyResultRouter.use('/:krId/commits', commitRouter);
// keyResultRouter.delete('/:krId/:commitId', keyResultMiddleware.checkGetOneKeyResult, commitRouter);

export default keyResultRouter;
