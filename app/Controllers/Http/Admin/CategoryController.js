'use strict'

const Category = use('App/Models/Category')
class CategoryController {
  async index ({ request, response, pagination }) {
/**
 * A IMPLEMENTAÇÃO DE PAGINAÇÃO SERA ATRAVES DE MIDDLEWARE
          * CASO NAO SERIA ASSIM.
 */
    // let { page, limit } = request.all()
    // if(!page || page == 0){
    //   console.log("Sem pagina")
    //   page = 1
    // }
    // if(!limit || limit == 0){
    //   console.log("Sem Limite")

    //   limit = 5
    // }

    // console.log("paginas: ",page," limite por pagina: ", limit)
    let page = pagination.page ? pagination.page : 1
    let limit =  pagination.limit ? pagination.limit : 10

    const search = request.input('search')
    const query = Category.query()

    if(search){
      // Se tiver termo de busca ira buscar
      query.where('title', 'LIKE', `%${search}%`)
    }
    const categories = await query.paginate( page, limit)
    
     response.send(categories)
   }

  async store ({ request, response }) {

    try {
      const data = request.only(['title', 'description', 'image_id'])

      const newCategory = await Category.create(data)
  
      response.send(newCategory)  
    } catch (error) {
      response.status(400).send({message: "Erro ao efetuar o cadastro!"})
    }
    

  }
  async show ({ params: { id }, response }) {

    const category = await Category.findOrFail(id)

    response.send(category)
  }
  async update ({ params: { id }, request, response }) {
    const category = await Category.findOrFail(id)

    const data = request.only(['title','description', 'image_id'])
    
    category.merge(data)
    await category.save()

    response.send( category )

  }

  async destroy ({ params: { id }, request, response }) {

    const category = await Category.findOrFail(id)

    await category.delete()

    response.status(204).send()
    
  }
}

module.exports = CategoryController
