import R from 'ramda'
import prepareRule from './prepareRule'

export default function addRules(context) {
  const { client, adds, say: { ok } } = context;

  const print = (id) => ok('Added rule ', id);
  const addRule = R.compose(R.composeP(print, R.prop('id'), client.rules.create), prepareRule('create'));

  return Promise.all(R.map(addRule, adds))
    .then(_ => context);
}
