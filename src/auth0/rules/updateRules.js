import R from 'ramda'
import prepareUpdate  from '../../transformers/rules/prepareRuleForUpdate'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function updateRules(context) {
  const { diff: { rules: { changes } } } = context;
  const updateFn = apiCallWrapper("rules.update", context);
  const updateRule = R.compose(updateFn, prepareUpdate);

  return Promise.all(R.map(updateRule, changes))
    .then(_ => context)
}
