import R from 'ramda'

export default function removeClients(context) {
  const { diff: { clients: { removes } }, say: { warn } } = context;
  const removeFn = ({ name, id }) =>
    Promise.resolve(warn(`⚠️  Please remove client ${name} (${id}) manually!`));

  return Promise.all(R.map(removeFn, removes))
    .then(_ => context);
}
