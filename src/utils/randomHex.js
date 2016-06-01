import crypto from 'crypto'
import { has, assoc } from 'ramda'
import promisify from './promisify'

export default function randomHex(key) {
  return function(context) {
    if(has(key, context)) { return context; }

    return promisify(crypto.randomBytes)(16)
      .then(buffer => assoc(key, buffer.toString('hex'), context));
  }
}
