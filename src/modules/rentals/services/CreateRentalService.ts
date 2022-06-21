import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'
import {
  calculateDifferenceBetweenDates,
  getDaysArray
} from '@shared/utils/date'

type IRequest = {
  check_in: Date
  checkout: Date
  property_id: string
  user_id: string
}

class CreateRentalService {
  public async execute({ check_in, checkout, property_id, user_id }: IRequest) {
    const property = await prisma.properties.findUnique({
      where: { id: property_id }
    })

    if (!property) {
      throw new AppError('Propery not found.')
    }

    const rentals = await prisma.rentals.findMany({
      where: {
        property_id
      }
    })

    const daysBetweenDates = getDaysArray(check_in, checkout)

    for (const rental of rentals) {
      const checkInInTime = rental?.check_in
      const checkOutInTime = rental?.checkout

      checkInInTime.setHours(0, 0, 0, 0)
      checkOutInTime.setHours(0, 0, 0, 0)

      if (
        daysBetweenDates.includes(checkInInTime.getTime()) ||
        daysBetweenDates.includes(checkOutInTime.getTime())
      ) {
        throw new AppError('There is already a rental in this date.')
      }
    }

    const rentalExists = await prisma.rentals.findFirst({
      where: {
        check_in,
        checkout,
        property_id
      }
    })

    if (rentalExists) {
      throw new AppError('There is already a rental in this date.')
    }

    const rental = await prisma.rentals.create({
      data: {
        total:
          calculateDifferenceBetweenDates(check_in, checkout) *
          property?.daily_price,
        property_id,
        user_id,
        check_in,
        checkout
      }
    })

    return {
      rental,
      time_of_stay: calculateDifferenceBetweenDates(check_in, checkout),
      property
    }
  }
}

export default CreateRentalService
