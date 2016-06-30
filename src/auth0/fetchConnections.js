import R from 'ramda'
import parseConnections from './parsers/parseConnections'

export default function fetchRules(context) {
  const { client } = context;

  return client.connections.getAll()
    .then(R.assoc('connections', R.__, context))
    .then(parseConnections)
}
