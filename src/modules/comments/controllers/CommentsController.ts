import { Request, Response } from 'express'
import CreateCommentService from '../services/CreateCommentService'
import ListCommentsService from '../services/ListCommentsService'

export default class CommentsController {
  public async index(request: Request, response: Response) {
    const { id } = request.params

    const listCommentsService = new ListCommentsService()

    const comments = await listCommentsService.execute({ id })

    return response.json(comments)
  }

  public async create(request: Request, response: Response) {
    const { property_id, message } = request.body
    const { id } = request.user

    const createCommentService = new CreateCommentService()

    const comment = await createCommentService.execute({
      property_id,
      message,
      user_id: id
    })

    return response.json(comment)
  }
}
