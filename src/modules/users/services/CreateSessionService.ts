import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'

type IRequest = {
  email: string
  password: string
}

class CreateSessionService {
  public async execute({ email, password }: IRequest) {
    const user = await prisma.users.findUnique({ where: { email } })

    if (!user) {
      throw new AppError('Incorrect credentials.', 401)
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new AppError('Incorrect credentials.', 401)
    }

    const token = sign({ isAdmin: user.isAdmin }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return {
      user,
      token
    }
  }
}

export default CreateSessionService
