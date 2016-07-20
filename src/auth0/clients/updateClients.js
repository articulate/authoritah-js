import R from 'ramda'
import prepare from '../../transformers/clients/prepareClientForUpdate'
import apiErrorHandler from '../../utils/apiErrorHandler'

const getId = R.pick(['client_id']);
export default function updateClients(context) {
  const { client, diff: { clients: { changes } }, say: { notice } } = context;
  const print = ({name}) => notice("Updated client: ", name);
  const updateFn = (obj) =>
    client.clients.update(getId(obj), prepare(obj))
      .then(print)
      .catch(apiErrorHandler(obj, "updating client", context));

  return Promise.all(R.map(updateFn, changes))
    .then(_ => context);
}
