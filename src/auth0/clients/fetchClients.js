import R from 'ramda'
import parse from '../../transformers/clients/parseClients'

export default function fetchClients(context) {
  const { client } = context;

  return client.clients.getAll()
    .then(R.assoc('clients', R.__, context))
    .then(parse);
}
