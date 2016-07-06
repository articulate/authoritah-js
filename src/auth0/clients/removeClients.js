import R from 'ramda'

export default function removeClients(context) {
  const { client, diff: { clients: { removes } }, say: { warn } } = context;

  const print = ({name}) => warn(`Removed client ${name}`);
  const removeWrapper = (cl) => client.clients.delete(R.pick(['client_id'], cl)).then(_ => cl);
  const removeClient = R.composeP(print, removeWrapper);

  return Promise.all(R.map(removeClient, removes))
    .then(_ => context);
}
