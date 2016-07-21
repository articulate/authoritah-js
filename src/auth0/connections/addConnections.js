import R from 'ramda'
import apiErrorHandler from '../../utils/apiErrorHandler'

export default function addConnections(context) {
  const { client, diff: { connections: { adds } }, say: { ok } } = context;
  const print = ({ name }) => ok("Created connection: ", name);
  const createFn = (obj) =>
    client.connections.create(obj)
      .then(print)
      .catch(apiErrorHandler("creating connection", obj, context));

  return Promise.all(R.map(createFn, adds))
    .then(_ => context);
}
