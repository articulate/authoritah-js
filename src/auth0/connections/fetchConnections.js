import R from 'ramda'

export default function fetchRules(context) {
  const { client } = context;

  return client.connections.getAll()
    .then(R.assoc('connections', R.__, context))
}
