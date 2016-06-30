import R from 'ramda'

export default function removeRules(context) {
  const { client, diff: { rules: { removes } }, say: { warn } } = context;

  const print = ({name}) => warn(`Removed rule ${name}`);
  const removeWrapper = (rule) => client.rules.delete(rule.id).then(_ => rule);
  const removeRule = R.composeP(print, removeWrapper);

  return Promise.all(R.map(removeRule, removes))
    .then(_ => context);
}
