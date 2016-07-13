import R from 'ramda'
import { prepareClient } from '../../transformers/clients/prepareClientForDiff'

export default function addClients(context) {
  const { client, diff: { clients: { adds } }, say: { ok } } = context;

  const print = ({name}) => ok('Added client ', name);
  const addClient = R.composeP(print, R.compose(client.clients.create, prepareClient));

  return Promise.all(R.map(addClient, adds))
    .then(_ => context);
}
