import prisma from '@shared/database/prismaClient'

type IRequest = {
  page: number
  per_page: number
}

class ListPropertiesService {
  public async execute({ page, per_page }: IRequest) {
    const pagesToSkip = Number(per_page) * Number(page) - Number(per_page)

    const propertiesCount = await prisma.properties.count()
    const data = await prisma.properties.findMany({
      skip: pagesToSkip,
      take: Number(per_page),
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

    const properties = data.map(property => {
      return {
        ...property,
        options: property.options.map(option => option.option)
      }
    })

    return { properties, propertiesCount }
  }
}

export default ListPropertiesService
