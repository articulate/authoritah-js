import R from 'ramda'
import apiCallWrapper from '../../utils/apiCallWrapper'
import prepareCreate from '../../transformers/rules/prepareRuleForCreate'

export default function addRules(context) {
  const { diff: { rules: { adds } } } = context;
  const createFn = apiCallWrapper("rules.create", context);
  const addRule = R.compose(createFn, prepareCreate);

  return Promise.all(R.map(addRule, adds))
    .then(_ => context);
}
