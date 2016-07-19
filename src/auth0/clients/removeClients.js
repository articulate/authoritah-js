import R from 'ramda'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function removeClients(context) {
  const { diff: { clients: { removes } } } = context;
  const removeFn = apiCallWrapper('clients.delete', context);

  return Promise.all(R.map(removeFn, removes))
    .then(_ => context);
}
