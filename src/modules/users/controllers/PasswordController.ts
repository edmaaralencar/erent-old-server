import { Request, Response } from 'express'
import ChangePasswordService from '../services/ChangePasswordService'
import ResetPasswordService from '../services/ResetPasswordService'
import SendForgotPasswordService from '../services/SendForgotPasswordService'

export default class PasswordController {
  public async create(request: Request, response: Response) {
    const { email } = request.body

    const sendForgotPassword = new SendForgotPasswordService()

    await sendForgotPassword.execute({ email })

    return response.json().status(200)
  }

  public async reset(request: Request, response: Response) {
    const { password, token } = request.body

    const resetPassword = new ResetPasswordService()

    const data = await resetPassword.execute({ password, token })

    return response.status(200).json(data)
  }

  public async update(request: Request, response: Response) {
    const { old_password, new_password } = request.body
    const { id } = request.user

    const changePassword = new ChangePasswordService()

    await changePassword.execute({ user_id: id, old_password, new_password })

    return response.status(204).json('Password changed sucessfully.')
  }
}
