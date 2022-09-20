import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'

type IRequest = {
  id: string
}

class ListCommentsService {
  public async execute({ id }: IRequest) {
    const comments = await prisma.comments.findMany({
      where: { property_id: id },
      include: {
        user: true
      }
    })

    if (!comments) {
      throw new AppError('No comments found in this property.', 400)
    }

    return { comments }
  }
}

export default ListCommentsService
