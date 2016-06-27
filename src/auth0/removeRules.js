import R from 'ramda'

export default function removeRules(context) {
  const { client, diff: { rules: { removes } }, say: { warn } } = context;

  const print = (id) => warn(`Removed rule ${id}`);
  const remove = (id) => {
    client.rules.delete({ id });
    return id;
  };
  const removeRule = R.compose(print, remove, R.prop('id'));

  return Promise.all(R.map(removeRule, removes))
    .then(_ => context);
}
