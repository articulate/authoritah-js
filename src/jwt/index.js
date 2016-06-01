import loadConfig from '../utils/loadConfig'
import transformParams from './transformParams'
import generateJWT from './generateJWT'

export default function index(options) {
  return loadConfig(options)
    .then(transformParams)
    .then(generateJWT)
    .then(console.log)
    .catch(console.error)
}

