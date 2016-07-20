import R from 'ramda'
import prepare from '../../transformers/clients/prepareClientForDiff'
import apiErrorHandler from '../../utils/apiErrorHandler'

export default function addClients(context) {
  const { client, diff: { clients: { adds } }, say: { ok } } = context;
  const print = ({ name }) => ok("Created client: ", name);
  const createFn = (obj) =>
    client.clients.create(prepare(obj))
      .then(print)
      .catch(apiErrorHandler("creating client", obj, context));

  return Promise.all(R.map(createFn, adds))
    .then(_ => context);
}
