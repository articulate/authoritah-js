import R from 'ramda'
import prepareAll from '../utils/prepareAll'
import diff from './diff'
import formatDiff from './formatDiff'

export default function index(filename='./auth0.yml', options) {
  return prepareAll(filename, options)
    .then(diff('rules'))
    .then(diff('connections'))
    .then(formatDiff)
    .then(console.log)
}
