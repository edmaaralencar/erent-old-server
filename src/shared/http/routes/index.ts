import { Router } from 'express'

import propertiesRouter from '@modules/properties/routes/properties.routes'
import sessionsRouter from '@modules/users/routes/sessions.routes'
import usersRouter from '@modules/users/routes/users.routes'
import rentalsRouter from '@modules/rentals/routes/rentals.routes'
import optionsRouter from '@modules/options/routes/options.routes'
import commentsRouter from '@modules/comments/routes/comments.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/properties', propertiesRouter)
routes.use('/rentals', rentalsRouter)
routes.use('/options', optionsRouter)
routes.use('/comments', commentsRouter)

export default routes
