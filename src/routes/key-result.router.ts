import { Router } from 'express';
import keyResultController from 'src/controllers/key-result.controller';
import keyResultMiddleware from 'src/middleware/key-result.middleware';

const keyResultRouter = Router()

keyResultRouter.post('/', keyResultMiddleware.createKeyResult, keyResultController.createKeyResult)
keyResultRouter.get('/')
keyResultRouter.get('/:id')
keyResultRouter.put('/:id')
keyResultRouter.delete('/:id')

export default keyResultRouter