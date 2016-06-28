import R from 'ramda'
import prepareConnection from './prepareConnection'

export default function updateConnections(context) {
  const { client, diff: { connections: { changes } }, say: { notice } } = context;

  const print = (id) => notice('Updated connection ', id);
  const update = (connection) => client.connections.update(R.pick(['id'], connection), prepareConnection('update')(connection));
  const updateConnection = R.composeP(print, R.prop('id'), update);

  return Promise.all(R.map(updateConnection, changes))
    .then(_ => context);
}
