'use strict'

const Product = use('App/Models/Product')

class ProductController {

  async index ({ request, response, pagination }) {

    const page = pagination.page ? pagination.page : 1
    const limit = pagination.limit ? pagination.limit : 10
    
    const search = request.input('search')
    const query = Product.query()
    
    if(search){
      query.where('name', 'LIKE', `%${search}%`)
    }
    const products = await query.paginate( page, limit)

    response.send(products)
  }

  async store ({ request, response }) {

    try {
        const data  = request.only(['name', 'description', 'price', 'image_id'])

        const product = await Product.create(data)

        response.send(product)
    } catch (error) {

      response.status(400).send({message: "Erro ao Cadastrar o Produto!"})
      
    }
  }

  async show ({ params: { id }, response }) {
    const product = await Product.findOrFail(id)
    response.send(product)
  }
  async update ({ params: { id }, request, response }) {
    const data = request.only(['name', 'description', 'image_id', 'price'])
    const product = await Product.findOrFail(id)
  
    product.merge(data)
    await product.save()
  
    response.send(product)
  }

  async destroy ({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id)
    await product.delete()
    response.status(204).send()
  }
}

module.exports = ProductController
