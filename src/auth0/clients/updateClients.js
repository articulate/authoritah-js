import R from 'ramda'
import prepareClient from '../../transformers/clients/prepareClientForDiff'

export default function updateClients(context) {
  const { client, diff: { clients: { changes } }, say: { notice } } = context;

  const print = ({name}) => notice('Updated client ', name);
  const updateWrapper = (cl) => client.clients.update(R.pick(['client_id'], cl), prepareClient(cl));
  const updateClient = R.composeP(print, updateWrapper);

  return Promise.all(R.map(updateClient, changes))
    .then(_ => context);
}
