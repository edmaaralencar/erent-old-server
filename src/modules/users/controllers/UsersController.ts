import { Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'
import ListUsersService from '../services/ListUsersService'
import ShowUserService from '../services/ShowUserService'

export default class UsersController {
  public async index(request: Request, response: Response) {
    const { page = 1, per_page = 10 } = request.query

    const listUsers = new ListUsersService()

    const users = await listUsers.execute({
      page: Number(page),
      per_page: Number(per_page)
    })

    return response.json(users)
  }

  public async show(request: Request, response: Response) {
    const { id } = request.user

    const listUsers = new ShowUserService()

    const user = await listUsers.execute({ id })

    return response.json(user)
  }

  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({ name, email, password })

    return response.json(user)
  }
}
