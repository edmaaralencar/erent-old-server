import prisma from '@shared/database/prismaClient'

class ListOptionsService {
  public async execute() {
    const options = await prisma.options.findMany()

    return options
  }
}

export default ListOptionsService
