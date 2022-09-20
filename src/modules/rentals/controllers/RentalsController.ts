import { Request, Response } from 'express'
import CreateRentalService from '../services/CreateRentalService'
import ListAllRentalsService from '../services/ListAllRentalsService'
import ListRentalsService from '../services/ListRentalsService'
import ShowRentalsService from '../services/ShowRentalsService'
import ShowSpecificRental from '../services/ShowSpecificRental'

export default class RentalsController {
  public async index(request: Request, response: Response) {
    const { page = 1, per_page = 10, property } = request.query

    const listRentals = new ListRentalsService()

    const rentals = await listRentals.execute({
      page: Number(page),
      per_page: Number(per_page),
      property: String(property)
    })

    return response.json(rentals)
  }

  public async listAll(request: Request, response: Response) {
    const { page = 1, per_page = 10 } = request.query

    const listAllRentals = new ListAllRentalsService()

    const rentals = await listAllRentals.execute({
      page: Number(page),
      per_page: Number(per_page)
    })

    return response.json(rentals)
  }

  public async show(request: Request, response: Response) {
    const { page = 1, per_page = 15 } = request.query
    const { id } = request.user

    const showRentals = new ShowRentalsService()

    const rentals = await showRentals.execute({
      page: Number(page),
      per_page: Number(per_page),
      id
    })

    return response.json(rentals)
  }

  public async create(request: Request, response: Response) {
    const { check_in, checkout, property_id } = request.body
    const { id: user_id } = request.user

    const createRental = new CreateRentalService()

    const rental = await createRental.execute({
      check_in,
      checkout,
      property_id,
      user_id
    })

    return response.json(rental)
  }

  public async showSpecific(request: Request, response: Response) {
    const { id } = request.params

    const showSpecificRental = new ShowSpecificRental()

    const rental = await showSpecificRental.execute({ id })

    return response.json(rental)
  }
}
