import R from 'ramda'
import prepareUpdate  from '../../transformers/rules/prepareRuleForUpdate'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function updateRules(context) {
  const { client, diff: { rules: { changes } }, say: { notice } } = context;
  const updateFn = apiCallWrapper(client.rules.update, context);

  const print = ({ name }) => notice('Updated rule ', name);
  const updateWrapper = (rule) => updateFn({ id: rule.id }, prepareUpdate(rule));
  const updateRule = R.composeP(print, updateWrapper);

  return Promise.all(R.map(updateRule, changes))
    .then(_ => context)
}
