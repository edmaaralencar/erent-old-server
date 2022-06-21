import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import prisma from '@shared/database/prismaClient'

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user

  const user = await prisma.users.findUnique({ where: { id } })

  if (!user?.isAdmin) {
    throw new AppError('Unauthorized to access this route.', 401)
  }

  return next()
}
