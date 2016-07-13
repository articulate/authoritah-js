import R from 'ramda'
import parse from '../../transformers/rules/parseRules'

const STAGES = [
  'login_success',
  'login_failure',
  'pre_authorize',
  'user_registration',
  'user_blocked',
];

export default function fetchRules(context) {
  const { client } = context;

  return Promise.all(R.map(stage => client.rules.getAll({ stage }), STAGES))
    .then(R.flatten)
    .then(R.assoc('rules', R.__, context))
    .then(parse);
}
