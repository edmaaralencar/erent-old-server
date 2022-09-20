import prisma from '@shared/database/prismaClient'

type IRequest = {
  page: number
  per_page: number
  id: string
}

class ShowRentalsService {
  public async execute({ page, per_page, id }: IRequest) {
    const pagesToSkip = Number(per_page) * Number(page) - Number(per_page)

    const rentalsCount = await prisma.rentals.count()
    const rentalsUnformatted = await prisma.rentals.findMany({
      where: { user_id: id },
      skip: pagesToSkip,
      take: Number(per_page),
      include: {
        property: {
          include: {
            images: true
          }
        }
      },
      orderBy: [
        {
          created_at: 'desc'
        }
      ]
    })

    const rentals = rentalsUnformatted.map(rental => {
      return {
        ...rental,
        check_in: rental.check_in.toLocaleString('pt-BR').split(' ')[0],
        checkout: rental.checkout.toLocaleString('pt-BR').split(' ')[0]
      }
    })

    return { rentals, rentalsCount }
  }
}

export default ShowRentalsService
