import R from 'ramda'
import apiErrorHandler from '../../utils/apiErrorHandler'

export default function addRules(context) {
  const { client, diff: { rules: { adds } }, say: { ok } } = context;
  const print = ({ name }) => ok("Created rule: ", name);
  const removeFn = (obj) =>
    client.rules.create(obj)
      .then(print)
      .catch(apiErrorHandler("creating rule", obj, context));

  return Promise.all(R.map(removeFn, adds))
    .then(_ => context);
}
