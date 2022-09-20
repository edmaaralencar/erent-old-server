import prisma from '@shared/database/prismaClient'

type IRequest = {
  page: number
  per_page: number
}

class ListAllRentalsService {
  public async execute({ page, per_page }: IRequest) {
    const pagesToSkip = Number(per_page) * Number(page) - Number(per_page)

    const rentalsCount = await prisma.rentals.count()
    const rentals = await prisma.rentals.findMany({
      skip: pagesToSkip,
      take: Number(per_page),
      include: {
        user: {
          select: {
            name: true
          }
        },
        property: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        {
          created_at: 'asc'
        }
      ]
    })

    return { rentals, rentalsCount }
  }
}

export default ListAllRentalsService
