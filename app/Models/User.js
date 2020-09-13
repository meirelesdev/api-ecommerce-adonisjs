'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
/**
 *  oculta o campo password quando retorna um usuario do banco.
 */
  static get hidden() {
    return ['password']
  }
/**
 *  Pega funções de arquivos externos ao model.
 */
  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }
  static boot () {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
    
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  image () {
    return this.belongsTo('App/Models/Image')
  }

  coupons () {
    return this.belongsToMany('App/Models/Coupon')
  }

  orders () {
    return this.hasMany('App/Models/Order')
  }
}

module.exports = User
