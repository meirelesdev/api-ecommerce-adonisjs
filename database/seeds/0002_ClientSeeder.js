'use strict'

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')
const User = use('App/Models/User')

class ClientSeeder {
  async run () {
    const role = await Role.findBy('slug', 'client')
    const Clients = await Factory.model('App/Models/User').createMany(30)
    
    await Promise.all(
      Clients.map(async client => {
        await client.role().attach([role.id])
       } 
      )
    )
    const user = await User.create({ 
      name : 'Daniel',
      surname: 'Meireles',
      email: 'daniel@gmail.com',
      password: 'secret'
    })
    const adminRole = await Role.findBy('slug', 'admin')
    await user.roles().attach([adminRole.id])
  }
}

module.exports = ClientSeeder
