import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'

type IRequest = {
  id: string
}

class ListRatingsService {
  public async execute({ id }: IRequest) {
    const ratings = await prisma.ratings.findMany({
      where: { property_id: id },
      include: {
        user: true
      }
    })

    if (!ratings) {
      throw new AppError('No ratings found in this property.', 400)
    }

    return { ratings }
  }
}

export default ListRatingsService
