import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'

type IRequest = {
  property_id: string
  user_id: string
  message: string
}

class CreateCommentService {
  public async execute({ property_id, user_id, message }: IRequest) {
    const property = await prisma.properties.findUnique({
      where: { id: property_id },
      include: {
        comments: true
      }
    })

    if (!property) {
      throw new AppError('Property not found.')
    }

    const rentals = await prisma.rentals.findMany({
      where: { user_id, property_id }
    })

    const hasPropertyInRentals = rentals.some(
      rental => rental.property_id === property?.id
    )

    const userHasAlreadyCommented = property.comments.some(
      comment => comment.user_id === user_id
    )

    if (!hasPropertyInRentals) {
      throw new AppError(
        'You cant comment in a property that you have not rented.',
        405
      )
    }

    if (userHasAlreadyCommented) {
      throw new AppError(`You've already commented in this property.`, 405)
    }

    const comment = await prisma.comments.create({
      data: {
        property_id,
        message,
        user_id
      }
    })
    return comment
  }
}

export default CreateCommentService
