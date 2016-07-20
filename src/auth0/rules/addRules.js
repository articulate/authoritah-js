import R from 'ramda'
import apiErrorHandler from '../../utils/apiErrorHandler'
import prepareCreate from '../../transformers/rules/prepareRuleForCreate'

export default function addRules(context) {
  const { client, diff: { rules: { adds } }, say: { ok } } = context;
  const print = ({ name }) => ok("Created rule: ", name);
  const removeFn = (obj) =>
    client.rules.create(prepareCreate(obj))
      .then(print)
      .catch(apiErrorHandler("creating rule", obj, context));

  return Promise.all(R.map(removeFn, adds))
    .then(_ => context);
}
