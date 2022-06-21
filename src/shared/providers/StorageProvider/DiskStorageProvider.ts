import uploadConfig from '@config/upload'
import fs from 'fs'
import path from 'path'

export default class DiskStorageProvider {
  public async saveFile(fileName: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, fileName),
      path.resolve(uploadConfig.directory, fileName)
    )

    return fileName
  }

  public async deleteFile(fileName: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, fileName)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
