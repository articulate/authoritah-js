import R from 'ramda'

const STAGES = [
  'login_success',
  'login_failure',
  'pre_authorize',
];

export default function fetchRules(context) {
  const { client } = context;

  return Promise.all(R.map(stage => client.rules.getAll({ stage }), STAGES))
    .then(R.flatten)
    .then(R.assoc('rules', R.__, context))
}
