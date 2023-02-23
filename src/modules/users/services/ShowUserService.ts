import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'

type IRequest = {
  id: string
}

class ShowUserService {
  public async execute({ id }: IRequest) {
    const user = await prisma.users.findUnique({
      where: {
        id
      },
      select: {
        avatar: true,
        email: true,
        name: true,
        isAdmin: true,
        id: true
      }
    })

    if (!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}

export default ShowUserService
