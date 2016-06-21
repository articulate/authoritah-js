import loadEnv from '../utils/loadEnv'
import setupClient from '../utils/setupClient'
import say from '../utils/say'

import fetchRules from '../auth0/fetchRules'
import fetchConnections from '../auth0/fetchConnections'
import saveRules from './saveRules'
import saveConnections from './saveConnections'
import saveManifest from './saveManifest'

export default function index(filePath, options) {
  const { format } = options;
  const { error, ok } = say(options);

  const ext = format == "json" ? "json" : "yml"
  const filename = filePath ? filePath : `auth0.${ext}`;

  return loadEnv(options)
    .then(setupClient)
    .then(fetchRules)
    .then(fetchConnections)
    .then(saveRules)
    .then(saveConnections)
    .then(saveManifest(filename))
    .then(ok(`Manifest written to ${filename}`))
    .catch(error);
}
