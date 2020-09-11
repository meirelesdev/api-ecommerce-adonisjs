'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle (ctx, next) {

    if(ctx.request.method() === 'GET'){
      console.log("Estamos no middleware ")
      const page = parseInt(ctx.request.input('page'))
      const limit = parseInt(ctx.request.input('limit'))
      const perPage = parseInt(ctx.request.input('perPage'))
      
      ctx.pagination = { page, limit }
            
      if(perPage){
        ctx.pagination.limit = perPage        
      }
    }
    // call next to advance the request
    await next()
  }
}

module.exports = Pagination
