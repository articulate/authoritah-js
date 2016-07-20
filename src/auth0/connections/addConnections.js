import R from 'ramda'
import prepare from '../../transformers/connections/prepareConnectionForCreate'
import apiErrorHandler from '../../utils/apiErrorHandler'

export default function addConnections(context) {
  const { client, diff: { connections: { adds } }, say: { ok }} = context;
  const print = ({ name }) => ok("Created connection: ", name);
  const createFn = (obj) =>
    client.connections.create(prepare(obj))
      .then(print)
      .catch(apiErrorHandler("creating connection", obj, context));

  return Promise.all(R.map(createFn, adds))
    .then(_ => context);
}
