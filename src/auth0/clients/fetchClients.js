import R from 'ramda'

export default function fetchClients(context) {
  const { client } = context;

  return client.clients.getAll()
    .then(R.assoc('clients', R.__, context))
}
