import R from 'ramda'
import prepareConnection from './prepareConnection'

export default function addConnections(context) {
  const { client, diff: { connections: { adds }}, say: { ok } } = context;

  const print = (id) => ok('Added connection ', id);
  const addConnection = R.compose(R.composeP(print, R.prop('id'), client.connections.create), prepareConnection);

  return Promise.all(R.map(addConnection, adds))
    .then(_ => context);
}
