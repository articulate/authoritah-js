import R from 'ramda'

import addRules from '../auth0/rules/addRules'
import updateRules from '../auth0/rules/updateRules'
import removeRules from '../auth0/rules/removeRules'

import addConnections from '../auth0/connections/addConnections'
import updateConnections from '../auth0/connections/updateConnections'
import removeConnections from '../auth0/connections/removeConnections'

const getActions = R.flip(R.prop)({
  rules: [addRules, updateRules, removeRules],
  connections: [addConnections, updateConnections, removeConnections],
});

function parallelizer(context, functions) {
  return Promise.all(R.map((fn) => fn(context), functions));
}

export default function(context) {
  const { diff } = context;
  const applier = R.partial(parallelizer, [context]);

  const promises = R.map(R.compose(applier, getActions), R.keys(diff));

  return Promise.all(promises)
    .then(_ => context);
}
