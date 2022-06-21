import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'

type IRequest = {
  id: string
}

class DeleteOptionService {
  public async execute({ id }: IRequest) {
    const option = await prisma.options.delete({
      where: {
        id
      }
    })

    if (!option) {
      throw new AppError('Option not found.')
    }

    return option
  }
}

export default DeleteOptionService
