import generateJID from './generateJID'
import generateJWT from './generateJWT'

export default function index(args) {
  return Promise.resolve(args)
    .then(generateJID)
    .then(generateJWT)
    .then(console.log)
    .catch(console.error)
}

