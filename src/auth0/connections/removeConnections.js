import R from 'ramda'
import apiErrorHandler from '../../utils/apiErrorHandler'

export default function removeConnections(context) {
  const { client, diff: { connections: { removes } }, say: { warn } } = context;
  const print = ({name}) => warn("Removed connection: ", name);
  const removeFn = (obj) =>
    client.connections.delete(R.pick(['id'], obj))
      .then(_ => print(obj))
      .catch(apiErrorHandler(obj, 'removing connection', context));


  return Promise.all(R.map(removeFn, removes))
    .then(_ => context);
}
