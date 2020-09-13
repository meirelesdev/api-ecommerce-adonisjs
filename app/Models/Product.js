'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    /**
     * Relacionamento entre produto e imagem DESTAQUE
     */
    image () {
        return this.belongsTo('App/Models/Image')
    }
    /**
     * Relacionamento entre produtos e imagens
     * Galeria de imagens do produto
     */
    images () {
        return this.belongsToMany('App/Models/Image')
    }
    /**
     * Relacionamento entre produto e categorias
     */
    categories () {
        return this.belongsToMany('App/Models/Category')
    }
    /**
     * Relacionamento Cupom e produto
     */
    coupons () {
        return this.belongsToMany('App/Models/Coupon')
    }
}

module.exports = Product
