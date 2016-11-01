import R from 'ramda'
import prepare  from '../../transformers/rules/prepareRuleForUpdate'
import apiErrorHandler from '../../utils/apiErrorHandler'

const getId = R.compose(R.pick(['id']), R.head);
export default function updateRules(context) {
  const { client, diff: { rules: { changes } }, say: { notice } } = context;
  const print = ({ name }) => notice("Updated rule: ", name);
  const updateFn = (obj) =>
    client.rules.update(getId(obj), prepare(obj))
      .then(print)
      .catch(apiErrorHandler(obj, "updating rule", context));

  return Promise.all(R.map(updateFn, changes))
    .then(_ => context)
}
