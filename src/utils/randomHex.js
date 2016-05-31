import crypto from 'crypto'
import promisify from './promisify'

export default function randomHex() {
  return promisify(crypto.randomBytes)(16)
    .then(buffer => buffer.toString('hex'));
}
