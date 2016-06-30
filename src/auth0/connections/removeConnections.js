import R from 'ramda'

export default function removeConnections(context) {
  const { client, diff: { connections: { removes } }, say: { warn } } = context;

  const print = ({ name }) => warn(`Removed connection ${name}`);
  const removeWrapper = (conn) => client.connections.delete({ id: conn.id }).then(_ => conn);
  const removeConnection = R.composeP(print, removeWrapper);

  return Promise.all(R.map(removeConnection, removes))
    .then(_ => context);
}
