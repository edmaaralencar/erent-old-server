import ensureAuthenticated from '@shared/http/middlewares/ensureAuthenticated'
import { Router } from 'express'

import CommentsController from '../controllers/CommentsController'

const commentsRouter = Router()
const commentsController = new CommentsController()

commentsRouter.get('/:id', commentsController.index)
commentsRouter.post('/', ensureAuthenticated, commentsController.create)

export default commentsRouter
