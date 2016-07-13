import R from 'ramda'
import parse from '../../transformers/connections/parseConnection'

export default function fetchRules(context) {
  const { client } = context;

  return client.connections.getAll()
    .then(R.assoc('connections', R.__, context))
    .then(parse)
}
