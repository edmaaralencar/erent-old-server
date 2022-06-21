import uploadConfig from '@config/upload'
import ensureAdmin from '@shared/http/middlewares/ensureAdmin'
import ensureAuthenticated from '@shared/http/middlewares/ensureAuthenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'
import UserAvatarController from '../controllers/UserAvatarController'
import UsersController from '../controllers/UsersController'

const upload = multer(uploadConfig)

const usersRouter = Router()

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.get('/', ensureAuthenticated, ensureAdmin, usersController.index)
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create
)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

usersRouter.get('/me', ensureAuthenticated, usersController.show)

export default usersRouter
