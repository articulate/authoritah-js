import R from 'ramda'
import parseRules from './parseRules'

const {
  assoc,
  __: _
  } = R;

export default function fetchRules(context) {
  const { client } = context;

  return client.rules.getAll()
    .then(assoc('rules', _, context))
    .then(parseRules)
}
