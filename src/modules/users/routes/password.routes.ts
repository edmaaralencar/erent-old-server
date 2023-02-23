// import { celebrate, Joi, Segments } from 'celebrate'
import ensureAuthenticated from '@shared/http/middlewares/ensureAuthenticated'
import { Router } from 'express'
import PasswordController from '../controllers/PasswordController'

const passwordRouter = Router()

const passwordController = new PasswordController()

passwordRouter.post('/forgot', passwordController.create)
passwordRouter.post('/reset', passwordController.reset)
passwordRouter.patch('/', ensureAuthenticated, passwordController.update)

export default passwordRouter
