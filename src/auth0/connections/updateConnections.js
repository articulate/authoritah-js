import R from 'ramda'
import prepareUpdate from '../../transformers/connections/prepareConnectionForUpdate'

export default function updateConnections(context) {
  const { client, diff: { connections: { changes } }, say: { notice } } = context;

  const print = ({name}) => notice('Updated connection ', name);
  const updateWrapper = (connection) => client.connections.update({ id: connection.id }, prepareUpdate(connection));
  const updateConnection = R.composeP(print, updateWrapper);

  return Promise.all(R.map(updateConnection, changes))
    .then(_ => context);
}
