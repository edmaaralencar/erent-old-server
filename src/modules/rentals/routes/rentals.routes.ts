import ensureAdmin from '@shared/http/middlewares/ensureAdmin'
import ensureAuthenticated from '@shared/http/middlewares/ensureAuthenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import RentalsController from '../controllers/RentalsController'

const rentalsRouter = Router()

const rentalsController = new RentalsController()

rentalsRouter.get('/', rentalsController.index)
rentalsRouter.get(
  '/all',
  ensureAuthenticated,
  ensureAdmin,
  rentalsController.listAll
)
rentalsRouter.get('/me', ensureAuthenticated, rentalsController.show)
rentalsRouter.get('/:id', rentalsController.showSpecific)
rentalsRouter.post(
  '/',
  ensureAuthenticated,
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
