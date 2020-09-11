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
        let buffer = new Buffer(bytes)

        string += buffer.toString('base64').replace(/[^A-z0-9]/g, '').substr(0, size)
    }
    return string
 }

 module.exports = {
    str_random
 }