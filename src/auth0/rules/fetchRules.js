import R from 'ramda'
import parseRules from './parseRules'

export default function fetchRules(context) {
  const { client } = context;

  return client.rules.getAll()
    .then(R.assoc('rules', R.__, context))
    .then(parseRules)
}
