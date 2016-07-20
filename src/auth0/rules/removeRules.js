import R from 'ramda'
import apiErrorHandler from '../../utils/apiErrorHandler'

export default function removeRules(context) {
  const { client, diff: { rules: { removes } }, say: { warn } } = context;
  const print = ({ name }) => warn("Removed rule: ", name);
  const removeFn = (obj) =>
    client.rules.delete(R.pick(['id'], obj))
      .then(_ => print(obj))
      .catch(apiErrorHandler(obj, 'removing rule', context));

  return Promise.all(R.map(removeFn, removes))
    .then(_ => context);
}
