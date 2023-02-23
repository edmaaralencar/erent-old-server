import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'
import { hash } from 'bcryptjs'

type IRequest = {
  token: string
  password: string
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest) {
    const userToken = await prisma.userTokens.findFirst({
      where: { token }
    })

    if (!userToken) {
      throw new AppError('This user token does not exist.')
    }

    const user = await prisma.users.findUnique({
      where: { id: userToken.user_id }
    })

    if (!user) {
      throw new AppError('There is not a user with this id.')
    }

    const tokenCreatedAt = userToken.created_at
    const twoHoursAgo = Date.now() - 2 * 1000 * 60 * 60

    if (tokenCreatedAt.getTime() < twoHoursAgo) {
      throw new AppError('This token has expired.')
    }

    await prisma.users.update({
      where: { id: userToken.user_id },
      data: {
        password: await hash(password, 10)
      }
    })

    return 'Senha trocada com sucesso.'
  }
}

export default ResetPasswordService
