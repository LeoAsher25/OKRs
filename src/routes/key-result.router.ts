import { Router } from 'express';
import keyResultController from 'src/controllers/key-result.controller';
import keyResultMiddleware from 'src/middleware/key-result.middleware';

const keyResultRouter = Router()

keyResultRouter.post('/', keyResultMiddleware.checkRequestData, keyResultController.createKeyResult)
keyResultRouter.get('/', keyResultMiddleware.checkValidObjectiveId, keyResultController.getAllKeyResults)
keyResultRouter.get('/:krId', keyResultMiddleware.checkValidObjectiveId, keyResultMiddleware.checkGetOneKeyResult, keyResultController.getOneKeyResult)
keyResultRouter.put('/:krId')
keyResultRouter.delete('/:krId')

export default keyResultRouter