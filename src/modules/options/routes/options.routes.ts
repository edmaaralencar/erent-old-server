import { Router } from 'express'
import ensureAdmin from '@shared/http/middlewares/ensureAdmin'
import ensureAuthenticated from '@shared/http/middlewares/ensureAuthenticated'
import OptionsController from '../controllers/OptionsController'
import { celebrate, Joi, Segments } from 'celebrate'

const optionsRouter = Router()
const optionsController = new OptionsController()

optionsRouter.use(ensureAuthenticated)
optionsRouter.use(ensureAdmin)

optionsRouter.get('/', optionsController.index)

optionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required()
    }
  }),
  optionsController.create
)

optionsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  optionsController.delete
)

export default optionsRouter
