import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'

type IRequest = {
  property_id: string
  user_id: string
  message: string
  value: number
}

class CreateRatingService {
  public async execute({ property_id, user_id, message, value }: IRequest) {
    const property = await prisma.properties.findUnique({
      where: { id: property_id },
      include: {
        ratings: true
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

    const userHasAlreadyRented = property.ratings.some(
      comment => comment.user_id === user_id
    )

    if (!hasPropertyInRentals) {
      throw new AppError(
        'You cant rate a property that you have not rented.',
        405
      )
    }

    if (userHasAlreadyRented) {
      throw new AppError(`You've already rated this property.`, 405)
    }

    const rating = await prisma.ratings.create({
      data: {
        property_id,
        message,
        user_id,
        value
      }
    })
    return rating
  }
}

export default CreateRatingService
