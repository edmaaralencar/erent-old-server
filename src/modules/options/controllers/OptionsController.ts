import { Request, Response } from 'express'
import CreateOptionService from '../services/CreateOptionService'
import DeleteOptionService from '../services/DeleteOptionService'
import ListOptionsService from '../services/ListOptionsService'

export default class OptionsController {
  public async index(request: Request, response: Response) {
    const listOptions = new ListOptionsService()

    const options = await listOptions.execute()

    return response.json(options)
  }

  public async create(request: Request, response: Response) {
    const { name } = request.body

    const createOption = new CreateOptionService()

    const option = await createOption.execute({
      name
    })

    return response.json(option)
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params

    const deleteOption = new DeleteOptionService()

    const option = await deleteOption.execute({ id })

    return response.json(option)
  }
}
