'use strict'

const Database = use('Database')
const User= use('App/Models/User')
const Role = use('Role')
class AuthController {
    async register ({ request, response }) {
        
        const trx = await Database.beginTransaction()
        
        try {
            const { name, surname, email, password } = request.all()

            const user = await User.create({name, surname, email, password }, trx)
            const userRole = await Role.findBy('slug', 'client')
            // const userAdminRole = await Role.findBy('slug', 'admin') PARA ADMINISTRADOR
            await user.roles().attach([userRole.id], null, trx)

            await trx.commit()

            response.status(201).send({ data: user })

        } catch (error) {

            await trx.rollback()

            response.status(400).send({ message: 'Erro ao Realizar cadastro!' })
        }
    }

    async login ({ request, response, auth }) {
        const { email, password } = request.all()

        let data = await auth.withRefreshToken().attempt(email, password)
        response.send({ data })
    }

    async refresh ({ request, response, auth }) {
        let refresh_token = request.input('refresh_token')

        if(!refresh_token){
            refresh_token = request.header('refresh_token')
        }
        
        const user = await auth.newRefreshToken().generateForRefreshToken(refresh_token)
    
        response.send({ data: user })
    }
    // testando a gravação de tela codando!
    async logout ({ request, response, auth }) {

        let refresh_token = request.input('refresh_token')

        if(!refresh_token){
            refresh_token = request.header('refresh_token')
        }
        await auth.authenticator('jwt').revokeTokens([refresh_token], true)

        response.status(204).send({})
    }

    async forgot ({ request, response }) {

    }
    
    async remember ({ request, response }) {

    }

    async reset ({ request, response }) {
        
    }
}

module.exports = AuthController
