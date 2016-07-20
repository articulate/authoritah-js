import R from 'ramda'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function removeConnections(context) {
  const { diff: { connections: { removes } } } = context;
  const removeFn = apiCallWrapper('connections.delete', context);

  return Promise.all(R.map(removeFn, removes))
    .then(_ => context);
}
