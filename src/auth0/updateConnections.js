import R from 'ramda'
import { prepareForUpdate } from './parsers/prepareConnection'

export default function updateConnections(context) {
  const { client, diff: { connections: { changes } }, say: { notice } } = context;

  const print = ({name}) => notice('Updated connection ', name);
  const updateWrapper = R.compose(client.connections.update, prepareForUpdate);
  const updateConnection = R.composeP(print, updateWrapper);

  return Promise.all(R.map(updateConnection, changes))
    .then(_ => context);
}
