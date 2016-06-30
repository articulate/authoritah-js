import R from 'ramda'
import { prepareForCreate } from './parsers/prepareRule'

export default function addRules(context) {
  const { client, diff: { rules: { adds } }, say: { ok } } = context;

  const print = ({name}) => ok('Added rule ', name);
  const addRule = R.compose(R.composeP(print, client.rules.create), prepareForCreate);

  return Promise.all(R.map(addRule, adds))
    .then(_ => context);
}
