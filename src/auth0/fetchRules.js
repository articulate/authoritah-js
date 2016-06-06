import R from 'ramda'

const {
  assoc,
  __: _
  } = R;

export default function fetchRules(context) {
  const { client } = context;

  return client.rules.getAll()
    .then(assoc('rules', _, context));
}
