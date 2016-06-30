import R from 'ramda'
import parseClients from './parsers/parseClients'

export default function fetchClients(context) {
  const { client } = context;

  return client.clients.getAll()
    .then(R.assoc('clients', R.__, context))
    .then(parseClients);
}
