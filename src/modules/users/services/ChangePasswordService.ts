import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'
import { compare, hash } from 'bcryptjs'

type IRequest = {
  user_id: string
  old_password: string
  new_password: string
}

class ChangePasswordService {
  public async execute({ user_id, old_password, new_password }: IRequest) {
    const user = await prisma.users.findUnique({
      where: { id: user_id }
    })

    if (!user) {
      throw new AppError('There is not a user with this id.')
    }

    if (new_password && !old_password) {
      throw new AppError('Old password is required.')
    }

    if (new_password && old_password) {
      const isOldPasswordCorrect = await compare(old_password, user.password)

      if (!isOldPasswordCorrect) {
        throw new AppError('Old password is not equal to your password.')
      }

      await prisma.users.update({
        where: { id: user_id },
        data: {
          password: await hash(new_password, 10)
        }
      })
    }
  }
}

export default ChangePasswordService
