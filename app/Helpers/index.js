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
  * @param { FileJar } file arquivo em si a ser salvo
  * @param { String } path caminho para salva-lo por padrao é nulo entao
  * o arquivo sera salvo na pasta public/uploads
  * returna o arquivo.
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
   // console.log("Recebi o arquivo...", file)
   // return
   await file.move(path, { name: fileName })

   return file
 }
/**
  * Gerenciamento de varios arquivo
  * @param { FileJar } file arquivo em si a ser salvo
  * @param { String } path caminho para salva-lo por padrao é nulo entao
  * o arquivo sera salvo na pasta public/uploads
  * returna um objeto com os success e os error.
  */
const manage_multiple_upload = async ( fileJar, path = null ) => {
   path = path? path : Helpers.publicPath('uploads')
   let success = []
   let error = []

   await Promise.all(fileJar.files.map( async file => {
      let random_name = await str_random(30)
      let fileName = `${new Date().getTime()}_${random_name}.${file.subtype}`

      await file.move(path, { name: fileName})
      if(file.moved()){
         success.push(file)
      }else{
         error.push(file.error())
      }   
   }))

   return { success, error }

}
 module.exports = {
    str_random,
    manage_single_upload,
    manage_multiple_upload
 }