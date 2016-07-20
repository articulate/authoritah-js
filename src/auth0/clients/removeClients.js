import R from 'ramda'
import apiErrorHandler from '../../utils/apiErrorHandler'

export default function removeClients(context) {
  const { client, diff: { clients: { removes } }, say: { warn } } = context;
  const print = ({name}) => warn("Removed client: ", name);
  const removeFn = (obj) =>
    client.clients.delete(R.pick(['client_id'], obj))
      .then(_ => print(obj))
      .catch(apiErrorHandler(obj, 'removing client', context));

  return Promise.all(R.map(removeFn, removes))
    .then(_ => context);
}
