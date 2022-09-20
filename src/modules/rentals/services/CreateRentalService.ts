import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'
import { stripe } from '@shared/lib/stripe'
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: property.name
            },
            unit_amount:
              calculateDifferenceBetweenDates(check_in, checkout) *
              property?.daily_price *
              100
          },
          adjustable_quantity: {
            enabled: false
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/error`
    })

    const rental = await prisma.rentals.create({
      data: {
        id: session.id,
        total:
          calculateDifferenceBetweenDates(check_in, checkout) *
          property?.daily_price,
        property_id,
        user_id,
        check_in,
        checkout,
        status: session.status as string
      }
    })

    return {
      checkoutUrl: session.url,
      rental,
      time_of_stay: calculateDifferenceBetweenDates(check_in, checkout),
      property
    }
  }
}

export default CreateRentalService
