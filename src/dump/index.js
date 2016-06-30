import loadEnv from '../utils/loadEnv'
import setupClient from '../utils/setupClient'
import say from '../utils/say'

import fetchRules from '../auth0/rules/fetchRules'
import fetchConnections from '../auth0/connections/fetchConnections'
import fetchClients from '../auth0/clients/fetchClients'

import associateClientConnections from './associateClientConnections'
import saveRules from './saveRules'
import saveConnections from './saveConnections'
import saveManifest from './saveManifest'

export default function index(filePath, options) {
  const { format } = options;
  const { error, ok } = say(options);

  const ext = format == "json" ? "json" : "yml";
  const filename = filePath ? filePath : `auth0.${ext}`;

  return loadEnv(options)
    .then(setupClient)
    .then(fetchRules)
    .then(fetchConnections)
    .then(fetchClients)
    .then(saveRules)
    .then(saveConnections)
    .then(associateClientConnections)
    .then(saveManifest(filename))
    .then(ok(`Manifest written to ${filename}`))
    .catch(error);
}
