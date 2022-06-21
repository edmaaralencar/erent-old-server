import ensureAdmin from '@shared/http/middlewares/ensureAdmin'
import ensureAuthenticated from '@shared/http/middlewares/ensureAuthenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import PropertiesController from '../controllers/PropertiesController'

import uploadConfig from '@config/upload'
import multer from 'multer'

const propertiesRouter = Router()
const propertiesController = new PropertiesController()

const upload = multer(uploadConfig)

propertiesRouter.get('/', propertiesController.index)

propertiesRouter.use(ensureAuthenticated)
propertiesRouter.use(ensureAdmin)

propertiesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  propertiesController.show
)

propertiesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  propertiesController.delete
)

propertiesRouter.post(
  '/',
  upload.array('file'),
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),
  //     description: Joi.string().required(),
  //     city: Joi.string().required(),
  //     region: Joi.string().required(),
  //     daily_price: Joi.number().required(),
  //     rooms: Joi.number().required(),
  //     bathrooms: Joi.number().required(),
  //     size: Joi.number().required(),
  //     capacity: Joi.number().required(),
  //     options: Joi.array().required()
  //   }
  // }),
  propertiesController.create
)

export default propertiesRouter
