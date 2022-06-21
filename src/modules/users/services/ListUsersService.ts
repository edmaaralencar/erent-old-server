import prisma from '@shared/database/prismaClient'

type IRequest = {
  page: number
  per_page: number
}

class ListUsersService {
  public async execute({ page, per_page }: IRequest) {
    const pagesToSkip = Number(per_page) * Number(page) - Number(per_page)

    const usersCount = await prisma.users.count()
    const users = await prisma.users.findMany({
      skip: pagesToSkip,
      take: Number(per_page),
      orderBy: [
        {
          created_at: 'asc'
        }
      ]
    })

    return { users, usersCount }
  }
}

export default ListUsersService
