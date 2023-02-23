import prisma from '@shared/database/prismaClient'

type IRequest = {
  page: number
  per_page: number
  region: string
  rooms: number
  daily_price: number
}

class ListPropertiesService {
  public async execute({
    page,
    per_page,
    region,
    rooms,
    daily_price
  }: IRequest) {
    const pagesToSkip = Number(per_page) * Number(page) - Number(per_page)

    const propertiesCount = await prisma.properties.count()

    const data = await prisma.properties.findMany({
      skip: pagesToSkip,
      take: Number(per_page),
      where: {
        ...(region !== '' ? { region } : {}),
        ...(rooms > 0 ? { rooms } : {}),
        ...(daily_price > 0 ? { daily_price: { lte: daily_price } } : {})
      },
      include: {
        images: true,
        options: {
          include: {
            option: true
          }
        }
      },
      orderBy: [
        {
          created_at: 'desc'
        }
      ]
    })

    let totalCountWithFilter

    if (region !== '' || rooms > 0 || daily_price > 0) {
      const data = await prisma.properties.findMany({
        where: {
          ...(region !== '' ? { region } : {}),
          ...(rooms > 0 ? { rooms } : {}),
          ...(daily_price > 0 ? { daily_price: { lte: daily_price } } : {})
        }
      })
      totalCountWithFilter = data.length
    }

    const properties = data.map(property => {
      return {
        ...property,
        options: property.options.map(option => option.option)
      }
    })

    return {
      properties,
      propertiesCount:
        region !== '' || rooms || daily_price
          ? totalCountWithFilter
          : propertiesCount
    }
  }
}

export default ListPropertiesService
