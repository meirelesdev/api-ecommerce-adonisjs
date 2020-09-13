'use strict'

// const { manage_multiple_upload } = require("../../../Helpers")
const fs = use('fs')
const Image = use('App/Models/Image')

const { manage_single_upload, manage_multiple_upload } = use('App/Helpers')

class ImageController {
  async index ({ request, response, pagination }) {

    const page = pagination.page ? pagination.page : 1
    const limit = pagination.limit ? pagination.limit : 10

    const images = await Image.query().orderBy('id', 'DESC').paginate(page, limit)

    response.send(images)
  }

  async store ({ request, response }) {
    // console.log("Entramos no store")
  
      const dataImage = request.file('images', {
        types: ['image'],
        size: '2mb'
      })
      
      let images = []
      //Caso seja so um arquivo
      if(!dataImage.files){
        
        const file = await manage_single_upload(dataImage)
        
        if(file.moved()){
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
           })
           images.push(image)

           response.status(201).send({
             successes: images, 
             errors: {}
            })
          }
          
        } else {
            //caso seja varios arquivos
            const files = await manage_multiple_upload(dataImage)
          
            await Promise.all(files.success.map(async file => {
              const image = await Image.create({
                  path: file.fileName,
                  size: file.size,
                  original_name: file.clientName,
                  extension: file.subtype
              })
              images.push(image)
            }))

            response.status(201).send({
              successes: images, 
              errors: files.error
            })
        }
  }
  async show ({ params: { id }, request, response }) {
    const image = await Image.findOrFail(id)
    
    response.send(image)

  }
  async update ({ params: { id }, request, response }) {
    const image = await Image.findOrFail(id)
    const data = request.only(['original_name'])
    try {
      
      image.merge(data)
      await image.save()

      response.send(image)
      
    } catch (error) {
      response.status(400).send({ message: 'Não foi possivel Atualizar a imagem'})
    }
  }
  async destroy ({ params: { id }, request, response }) {

    const image = await Image.findOrFail(id)
    console.log("No banco temos ", image)
    try {
      let filePath = Helpers.publicPath(`uploads/${image.path}`)
      // await fs.unlink(filePath, err => {
      //  if(!err)   await image.delete()        
      // })
      response.status(204).send()

    } catch (error) {
      response.status(400).send({ message: "Erro ao deletar o arquivo!"})
      
    }
  }
}

module.exports = ImageController
