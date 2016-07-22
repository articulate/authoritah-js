import R from 'ramda'

export default function removeConnections(context) {
  const { diff: { connections: { removes } }, say: { warn } } = context;
  const removeFn = ({ name, id }) =>
    Promise.resolve(warn(`⚠️  Please remove connection ${name} (${id}) manually!`));

  return Promise.all(R.map(removeFn, removes))
    .then(_ => context);
}
