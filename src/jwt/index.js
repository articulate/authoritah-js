import loadEnv from '../utils/loadEnv'
import generateJWT from './generateJWT'
import say from '../utils/say'

export default function index(options) {
  const { error, ok } = say(options);

  return loadEnv(options)
    .then(generateJWT)
    .then(ok)
    .catch(error);
}
