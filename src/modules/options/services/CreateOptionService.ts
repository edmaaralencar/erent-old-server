import prisma from '@shared/database/prismaClient'

type IRequest = {
  name: string
}

class CreateOptionService {
  public async execute({ name }: IRequest) {
    const option = await prisma.options.create({
      data: {
        name
      }
    })

    return option
  }
}

export default CreateOptionService
