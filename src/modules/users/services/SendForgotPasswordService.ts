import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'
import EtherealMailProvider from '@shared/providers/EmailProvider/EtherealMailProvider'
import { resolve } from 'path'

type IRequest = {
  email: string
}

class SendForgotPasswordService {
  public async execute({ email }: IRequest) {
    const etherealEmailProvider = new EtherealMailProvider()

    const user = await prisma.users.findFirst({
      where: { email }
    })

    if (!user) {
      throw new AppError('There is not a user with this email.')
    }

    const userToken = await prisma.userTokens.create({
      data: {
        user_id: user.id
      }
    })

    const templatePath = resolve(__dirname, '..', 'views', 'forgotPassword.hbs')

    await etherealEmailProvider.sendMail({
      to: email,
      variables: {
        name: user.name,
        link: `http://localhost:3000/forgot-password?token=${userToken.token}`
      },
      subject: 'Recuperação de senha',
      file: templatePath
    })

    return 'E-mail sented.'
  }
}

export default SendForgotPasswordService
