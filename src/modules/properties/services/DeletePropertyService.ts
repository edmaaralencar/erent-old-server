import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'

type IRequest = {
  id: string
}

class DeletePropertyService {
  public async execute({ id }: IRequest) {
    const property = await prisma.properties.findUnique({
      where: {
        id
      }
    })

    if (!property) {
      throw new AppError('Property not found.')
    }

    await prisma.properties.delete({ where: { id } })

    return property
  }
}

export default DeletePropertyService
