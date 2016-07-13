import R from 'ramda'
import apiCallWrapper from '../../utils/apiCallWrapper'
import prepareCreate from '../../transformers/rules/prepareRuleForCreate'

export default function addRules(context) {
  const { client, diff: { rules: { adds } }, say: { ok } } = context;
  const createFn = apiCallWrapper(client.rules.create, context);

  const print = ({ name }) => ok('Added rule ', name);
  const addRule = R.compose(R.composeP(print, createFn), prepareCreate);

  return Promise.all(R.map(addRule, adds))
    .then(_ => context);
}
