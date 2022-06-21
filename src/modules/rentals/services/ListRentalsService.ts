import prisma from '@shared/database/prismaClient'

type IRequest = {
  page: number
  per_page: number
  property: string
}

class ListRentalsService {
  public async execute({ page, per_page, property }: IRequest) {
    const pagesToSkip = Number(per_page) * Number(page) - Number(per_page)

    const rentalsCount = await prisma.rentals.count()
    const rentals = await prisma.rentals.findMany({
      where: { property_id: property },
      skip: pagesToSkip,
      take: Number(per_page),
      include: {
        property: true,
        user: {
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

    console.log(rentals)

    return { rentals, rentalsCount }
  }
}

export default ListRentalsService
