import R from 'ramda'
import loadEnv from '../utils/loadEnv'
import setupClient from '../utils/setupClient'
import removeRule from '../auth0/rules/removeRule'
import removeConnection from '../auth0/connections/removeConnection'

const _startsWith = (prefix, string) => string.startsWith(prefix);
const startsWith = R.curry(_startsWith);

const removalFn = R.cond([
  [startsWith("con_"), removeConnection],
  [startsWith("rul_"), removeRule],
])

export default function index(ruleId, options) {
  return loadEnv(options)
    .then(setupClient)
    .then(removalFn(ruleId));
}
