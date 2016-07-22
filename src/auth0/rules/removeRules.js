import R from 'ramda'

export default function removeRules(context) {
  const { diff: { rules: { removes } }, say: { warn } } = context;
  const removeFn = ({ name, id }) =>
    Promise.resolve(warn(`⚠️  Please remove rule ${name} (${id}) manually!`));

  return Promise.all(R.map(removeFn, removes))
    .then(_ => context);
}
