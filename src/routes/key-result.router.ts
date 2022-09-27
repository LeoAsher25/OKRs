import { Router } from 'express';
import keyResultController from 'src/controllers/key-result.controller';
import keyResultMiddleware from 'src/middleware/key-result.middleware';

const keyResultRouter = Router({
  mergeParams: true
});

keyResultRouter.post('/', keyResultMiddleware.checkRequestData, keyResultController.createKeyResult);
keyResultRouter.get('/', keyResultController.getAllKeyResults);
keyResultRouter.get('/:krId', keyResultMiddleware.checkGetOneKeyResult, keyResultController.getOneKeyResult);
keyResultRouter.put('/:krId', keyResultController.updateKeyResult);
keyResultRouter.delete('/:krId', keyResultController.deleteKeyResult);
// keyResultRouter.delete('/:krId/:commitId', keyResultMiddleware.checkGetOneKeyResult, commitRouter);

export default keyResultRouter;
