import prisma from '@shared/database/prismaClient'
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider'

type Option = {
  id: string
}

type IRequest = {
  name: string
  description: string
  city: string
  region: string
  daily_price: number
  rooms: number
  bathrooms: number
  size: number
  capacity: number
  options: Option[]
  images: string[]
}

class CreatePropertyService {
  public async execute({
    name,
    description,
    city,
    region,
    daily_price,
    rooms,
    bathrooms,
    size,
    capacity,
    options,
    images
  }: IRequest) {
    const storageProvider = new DiskStorageProvider()

    const imgs = []

    for (let i = 0; i < images.length; i++) {
      const filename = await storageProvider.saveFile(images[i])

      imgs.push({ image_name: filename })
    }

    const optionsWithPropertyId = options.map(option => {
      return {
        option_id: option.id
      }
    })

    const data = await prisma.properties.create({
      data: {
        name,
        description,
        city,
        region,
        daily_price: Number(daily_price),
        rooms: Number(rooms),
        bathrooms: Number(bathrooms),
        size: Number(size),
        capacity: Number(capacity),
        images: {
          createMany: {
            data: imgs
          }
        },
        options: {
          createMany: {
            data: optionsWithPropertyId
          }
        }
      },
      include: {
        options: {
          include: {
            option: true
          }
        },
        images: true
      }
    })

    const property = {
      ...data,
      options: data.options.map(option => option.option)
    }

    // if (options) {
    //   const optionsWithPropertyId = options.map(option => {
    //     return {
    //       option_id: option.id,
    //       property_id: property.id
    //     }
    //   })

    //   await prisma.optionsOnProperties.createMany({
    //     data: optionsWithPropertyId
    //   })
    // }

    // if (images) {
    // const imgs = []

    // for (let i = 0; i < images.length; i++) {
    //   const filename = await storageProvider.saveFile(images[i])

    //   imgs.push({ image_name: filename, property_id: property.id })
    // }

    // await prisma.propertyImages.createMany({
    //   data: imgs
    // })
    // }

    return property
  }
}

export default CreatePropertyService
