import ensureAuthenticated from '@shared/http/middlewares/ensureAuthenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import RentalsController from '../controllers/RentalsController'

const rentalsRouter = Router()

const rentalsController = new RentalsController()

rentalsRouter.use(ensureAuthenticated)

rentalsRouter.get('/me', rentalsController.show)
rentalsRouter.get('/', rentalsController.index)

rentalsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      property_id: Joi.string().uuid().required(),
      check_in: Joi.date().required(),
      checkout: Joi.date().required()
    }
  }),
  rentalsController.create
)

export default rentalsRouter
