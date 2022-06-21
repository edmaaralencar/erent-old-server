import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'

type IRequest = {
  id: string
}

class ShowPropertyService {
  public async execute({ id }: IRequest) {
    const data = await prisma.properties.findUnique({
      where: {
        id
      },
      include: {
        images: true,
        options: {
          include: {
            option: true
          }
        }
      }
    })

    if (!data) {
      throw new AppError('Property not found.')
    }

    const property = {
      ...data,
      options: data.options.map(option => option.option)
    }

    return property
  }
}

export default ShowPropertyService
