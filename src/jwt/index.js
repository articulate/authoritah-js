import loadEnv from '../utils/loadEnv'
import transformParams from './transformParams'
import generateJWT from './generateJWT'
import say from '../utils/say'

export default function index(options) {
  const { ok, error } = say(options);

  return loadEnv(options)
    .then(transformParams)
    .then(generateJWT)
    .then(ok)
    .catch(error)
}

