import R from 'ramda'
import { prepareForCreate } from './parsers/prepareConnection'

export default function addConnections(context) {
  const { client, diff: { connections: { adds }}, say: { ok } } = context;

  const print = ({ name }) => ok('Added connection ', name);
  const addConnection = R.compose(R.composeP(print, client.connections.create), prepareForCreate);

  return Promise.all(R.map(addConnection, adds))
    .then(_ => context);
}
