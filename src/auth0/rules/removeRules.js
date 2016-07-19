import R from 'ramda'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function removeRules(context) {
  const { diff: { rules: { removes } } } = context;
  const removeFn = apiCallWrapper('rules.delete', context);

  return Promise.all(R.map(removeFn, removes))
    .then(_ => context);
}
