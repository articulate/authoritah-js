import R from 'ramda'
import prepareUpdate from '../../transformers/connections/prepareConnectionForUpdate'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function updateConnections(context) {
  const { client, diff: { connections: { changes } }, say: { notice } } = context;
  const updateFn = apiCallWrapper(client.connections.update, context);

  const print = ({name}) => notice('Updated connection ', name);
  const updateWrapper = (connection) => updateFn({ id: connection.id }, prepareUpdate(connection));
  const updateConnection = R.composeP(print, updateWrapper);

  return Promise.all(R.map(updateConnection, changes))
    .then(_ => context);
}
