'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ request, response, pagination }) {
    const search = request.input('search')
    const query = User.query()
    const page = pagination.page ? pagination.page : 1
    const limit = pagination.limit ? pagination.limit : 10

    if(search) {
      query.where('name', 'LIKE', `%${search}%`)
      query.orWhere('surname', 'LIKE', `%${search}%`)
      query.orWhere('email', 'LIKE', `%${search}%`)
    }
    const users = await query.paginate(page, limit)

    response.send(users)
  }
  async store ({ request, response }) {
    const data = request.only(['name', 'surname', 'email', 'password', 'image_id'])

    const newUser = await User.create(data)

    response.send(newUser)

  }
  async show ({ params: { id }, request, response }) {
    const user = await User.findOrFail(id)
    response.send(user)
  }
  async update ({ params: { id }, request, response }) {
    const data  = request.only(['name', 'surname', 'email', 'password', 'image_id'])
    const user = await User.findOrFail(id)

    user.merge(data)
    await user.save()

    response.send(user)
  }
  async destroy ({ params: { id }, request, response }) {
    
    const user = await User.findOrFail(id)
    await user.delete()

    response.status(204).send()
  }
}

module.exports = UserController
