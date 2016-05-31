import fs from 'fs'
import promisify from './promisify'
import { path } from 'ramda'

export default function versionParser() {
  return promisify(fs.readFile)('./package.json')
    .then(JSON.parse)
    .then(path(['version']))
}
