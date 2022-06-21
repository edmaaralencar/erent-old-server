import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'
import { hash } from 'bcryptjs'

type IRequest = {
  email: string
  name: string
  password: string
}

class CreateUserService {
  public async execute({ email, name, password }: IRequest) {
    const emailExists = await prisma.users.findUnique({
      where: {
        email
      }
    })

    if (emailExists) {
      throw new AppError('Email address already in use.')
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return user
  }
}

export default CreateUserService
