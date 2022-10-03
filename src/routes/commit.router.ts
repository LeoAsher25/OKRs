import { Router } from 'express';
import commitController from 'src/controllers/commit.controller';
import commitMiddleware from 'src/middleware/commit.middleware';

const commitRouter = Router({
  mergeParams: true
});

commitRouter.post('/', commitMiddleware.checkKeyResult, commitMiddleware.checkCommitData, commitController.create);
commitRouter.get('/', commitMiddleware.checkKeyResult, commitMiddleware.checkCommitData, commitController.create);
// commitRouter.get('/:krId');

export default commitRouter;
