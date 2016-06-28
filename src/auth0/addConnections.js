import R from 'ramda'
import prepareConnection from './prepareConnection'

export default function addConnections(context) {
  const { client, diff: { connections: { adds }}, say: { ok, error } } = context;

  const print = ({name: id}) => ok('Added connection ', id);
  const addConnection = R.compose(R.composeP(print, client.connections.create), prepareConnection('create'));

  return Promise.all(R.map(addConnection, adds))
    .then(_ => context);
}
