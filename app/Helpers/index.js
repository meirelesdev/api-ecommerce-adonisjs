'use strict'

const Crypto = use('crypto')
const Helpers = use('Helpers')

/**
 * Generate random string
 * @param { int } length - O tamanho da string que vc quer
 * @return { string } - Returno da função é uma string aleatoria do tamnho solicitado
 */

 const str_random = async (length = 40 ) => {
    
    let string = ''
    let len = string.length
    if(len < length) {
        let size = length - len
        let bytes = await Crypto.randomBytes(size)
        let buffer = Buffer.from(bytes)

        string += buffer.toString('base64').replace(/[^A-z0-9]/g, '').substr(0, size)
    }
    return string
 }
 /**
  * Gerenciamento de um unico arquivo
  */
 const manage_single_upload = async ( file, path = null ) => {
   /**
    * Gerando os nomes de pastas e do arquivo
    */
   path = path ? path : Helpers.publicPath('uploads')
   const random_name = await str_random(30)
   let fileName = `${new Date().getTime()}_${random_name}.${file.subtype}`
   /**
    * Tratar o arquivo 
    */
   await file.move(path, { name: fileName })

   return file
 }

 module.exports = {
    str_random
 }