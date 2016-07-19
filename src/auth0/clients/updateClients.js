import R from 'ramda'
import prepare from '../../transformers/clients/prepareClientForUpdate'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function updateClients(context) {
  const { diff: { clients: { changes } } } = context;
  const updateFn = apiCallWrapper("clients.update", context);
  const updateClient = R.compose(updateFn, prepare);

  return Promise.all(R.map(updateClient, changes))
    .then(_ => context);
}
