import ensureAuthenticated from '@shared/http/middlewares/ensureAuthenticated'
import { Router } from 'express'

import RatingsController from '../controllers/RatingsController'

const ratingsRouter = Router()
const ratingsController = new RatingsController()

ratingsRouter.get('/:id', ratingsController.index)
ratingsRouter.post('/', ensureAuthenticated, ratingsController.create)

export default ratingsRouter
