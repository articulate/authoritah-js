import R from 'ramda'
import prepareUpdate from '../../transformers/connections/prepareConnectionForUpdate'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function updateConnections(context) {
  const { diff: { connections: { changes } } } = context;
  const updateFn = apiCallWrapper("connections.update", context);
  const updateConnection = R.compose(updateFn, prepareUpdate);

  return Promise.all(R.map(updateConnection, changes))
    .then(_ => context);
}
