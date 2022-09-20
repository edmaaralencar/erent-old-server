import prisma from '@shared/database/prismaClient'

type IRequest = {
  id: string
}

class ShowSpecificRental {
  public async execute({ id }: IRequest) {
    const rental = await prisma.rentals.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            images: true
          }
        }
      }
    })

    return { rental }
  }
}

export default ShowSpecificRental
