import R from 'ramda'

export default function removeConnections(context) {
  const { client, diff: { connections: { removes } }, say: { warn } } = context;

  const print = ({ name: id }) => warn(`Removed connection ${id}`);
  const remove = (conn) => {
    const { id } = conn;
    client.connections.delete({ id });
    return conn;
  };
  const removeConnection = R.compose(print, remove);

  return Promise.all(R.map(removeConnection, removes))
    .then(_ => context);
}
