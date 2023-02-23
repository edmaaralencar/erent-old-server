import { Request, Response } from 'express'
import CreateRatingService from '../services/CreateRatingService'
import ListRatingsService from '../services/ListRatingsService'

export default class RatingsController {
  public async index(request: Request, response: Response) {
    const { id } = request.params

    const listRatingsService = new ListRatingsService()

    const ratings = await listRatingsService.execute({ id })

    return response.json(ratings)
  }

  public async create(request: Request, response: Response) {
    const { property_id, message, value } = request.body
    const { id } = request.user

    const createRatingService = new CreateRatingService()

    const rating = await createRatingService.execute({
      property_id,
      message,
      user_id: id,
      value
    })

    return response.json(rating)
  }
}
