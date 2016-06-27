import R from 'ramda'

export default function removeConnections(context) {
  const { client, diff: { connections: { removes } }, say: { warn } } = context;

  const print = (id) => warn(`Removed connection ${id}`);
  const remove = (id) => {
    client.connections.delete({ id });
    return id;
  };
  const removeConnection = R.compose(print, remove, R.prop('id'));

  return Promise.all(R.map(removeConnection, removes))
    .then(_ => context);
}
