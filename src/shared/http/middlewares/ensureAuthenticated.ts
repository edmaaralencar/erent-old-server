import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import authConfig from '@config/auth'

type ITokenPayload = {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token not found.')
  }

  const [, token] = authHeader.split(' ')

  try {
    const payload = verify(token, authConfig.jwt.secret as Secret)

    const { sub } = payload as ITokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch (error) {
    throw new AppError('Invalid JWT Token.')
  }
}
