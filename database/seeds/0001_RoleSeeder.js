'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('Role')

class RoleSeeder {
  async run () {
    // Cria Role admin
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Adminitrador do sistema'
    })
    //cria o cargo de gerente
    await Role.create({ 
      name : 'Manager',
      slug: 'manager',
      description: 'Gerente da loja'
    })
    // Cria o Cliente
    await Role.create({ 
      name: 'Client',
      slug: 'client',
      description: 'Cliente da Loja'
    })
  }
}

module.exports = RoleSeeder
