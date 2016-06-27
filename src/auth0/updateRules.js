import R from 'ramda'
import prepareRule from './prepareRule'

export default function updateRules(context) {
  const { client, diff: { rules: { changes } }, say: { notice } } = context;

  const print = (id) => notice('Updated rule ', id);
  const update = (rule) => client.rules.update(R.pick(['id'], rule), prepareRule('update')(rule));
  const updateRule = R.composeP(print, R.prop('id'), update);

  return Promise.all(R.map(updateRule, changes))
    .then(_ => context);
}
