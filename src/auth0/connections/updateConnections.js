import R from 'ramda'
import { prepareForUpdate } from './prepareConnection'

export default function updateConnections(context) {
  const { client, diff: { connections: { changes } }, say: { notice } } = context;

  const print = ({name}) => notice('Updated connection ', name);
  const updateWrapper = (connection) => client.connections.update(R.pick(['id'], connection), prepareForUpdate(connection));
  const updateConnection = R.composeP(print, updateWrapper);

  return Promise.all(R.map(updateConnection, changes))
    .then(_ => context);
}
