import { Request, Response } from 'express'
import CreatePropertyService from '../services/CreatePropertyService'
import DeletePropertyService from '../services/DeletePropertyService'
import ListPropertiesService from '../services/ListPropertiesService'
import ShowPropertyService from '../services/ShowPropertyService'

export default class PropertiesController {
  public async index(request: Request, response: Response) {
    const { page = 1, per_page = 10 } = request.query

    const listProperties = new ListPropertiesService()

    const properties = await listProperties.execute({
      page: Number(page),
      per_page: Number(per_page)
    })

    return response.json(properties)
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params

    const showProperty = new ShowPropertyService()

    const property = await showProperty.execute({ id })

    return response.json(property)
  }

  public async create(request: Request, response: Response) {
    const {
      name,
      description,
      city,
      region,
      daily_price,
      rooms,
      bathrooms,
      size,
      capacity,
      options
    } = request.body
    const files = request.files as any[]
    const images = files.map(img => img.filename)

    const createProperty = new CreatePropertyService()

    const property = await createProperty.execute({
      name,
      description,
      city,
      region,
      daily_price,
      rooms,
      bathrooms,
      size,
      capacity,
      options: JSON.parse(options),
      images
    })

    return response.json(property)
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params

    const deleteProperty = new DeletePropertyService()

    const property = await deleteProperty.execute({ id })

    return response.json(property)
  }
}
