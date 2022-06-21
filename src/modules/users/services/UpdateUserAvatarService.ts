import prisma from '@shared/database/prismaClient'
import AppError from '@shared/errors/AppError'
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider'

type IRequest = {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest) {
    const storageProvider = new DiskStorageProvider()

    const user = await prisma.users.findUnique({
      where: {
        id: user_id
      }
    })

    if (!user) {
      throw new AppError('User not found.')
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar)
    }

    const filename = await storageProvider.saveFile(avatarFilename)

    const updatedUser = await prisma.users.update({
      where: { id: user_id },
      data: {
        avatar: filename
      }
    })

    return updatedUser
  }
}

export default UpdateUserAvatarService
