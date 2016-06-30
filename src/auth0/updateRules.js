import R from 'ramda'
import { prepareForUpdate } from './parsers/prepareRule'

export default function updateRules(context) {
  const { client, diff: { rules: { changes } }, say: { notice } } = context;

  const print = ({name}) => notice('Updated rule ', name);
  const updateWrapper = (rule) => client.rules.update(R.pick(['id'], rule), prepareForUpdate(rule));
  const updateRule = R.composeP(print, updateWrapper);

  return Promise.all(R.map(updateRule, changes))
    .then(_ => context);
}
