import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { errors } from 'celebrate'
import routes from './routes'
import AppError from '@shared/errors/AppError'
import uploadConfig from '@config/upload'
import StripeWebHook from '@modules/rentals/services/StripeWebHook'

const app = express()

app.use(cors())
app.post('/webhooks', express.raw({ type: 'application/json' }), StripeWebHook)
app.use(express.json())

app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use(errors())

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message })
    }

    console.log(error)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

app.listen(3333, () => console.log('Server running on Port 3333!'))
