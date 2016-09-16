import R from 'ramda'
import prepareAll from '../utils/prepareAll'
import diff from './diff'

const formatJSON  = R.curry(JSON.stringify)(R.__, null, "  ");

export default function index(filename='./auth0.yml', options) {
  return prepareAll(filename, options)
    .then(diff('rules'))
    .then(({diff}) => R.compose(console.log, formatJSON)(diff))
}
