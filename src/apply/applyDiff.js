import R from 'ramda'

import addRules from '../auth0/rules/addRules'
import updateRules from '../auth0/rules/updateRules'
import removeRules from '../auth0/rules/removeRules'

import addConnections from '../auth0/connections/addConnections'
import updateConnections from '../auth0/connections/updateConnections'
import removeConnections from '../auth0/connections/removeConnections'

// Currently going to always apply changes to clients to ensure it picks up the new uuids
// import addClients from '../auth0/clients/addClients'
// import removeClients from '../auth0/clients/removeClients'
import updateClients from '../auth0/clients/updateClients'

const getActions = R.flip(R.prop)({
  rules: [addRules, updateRules, removeRules],
  connections: [addConnections, updateConnections, removeConnections],
  clients: [updateClients],
});

function parallelizer(context, functions) {
  return Promise.all(R.map((fn) => fn(context), functions));
}

export default function applyDiff(context) {
  const { diff } = context;
  const applier = R.partial(parallelizer, [context]);

  const promises = R.map(R.compose(applier, getActions), R.keys(diff));

  return Promise.all(promises)
    .then(_ => context);
}
