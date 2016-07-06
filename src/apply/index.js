import loadEnv from '../utils/loadEnv'
import say from '../utils/say'

import loadManifest from '../apply/loadManifest'
import setupClient from '../utils/setupClient'
import fetchRules from '../auth0/rules/fetchRules'
import fetchConnections from '../auth0/connections/fetchConnections'
import fetchClients from '../auth0/clients/fetchClients'
import { disassociate } from '../utils/associateClientConnections'

import diff from './diff'
import applyDiff from './applyDiff'
import insertClients from './insertClients'

export default function index(filename='./auth0.yml', options) {
  const { error } = say(options);

  return loadEnv(options)
    .then(loadManifest(filename))
    .then(setupClient)
    .then(fetchRules)
    .then(fetchConnections)
    .then(fetchClients)
    .then(disassociate)
    .then(diff('rules'))
    .then(diff('connections'))
    .then(insertClients)
    .then(applyDiff)
    .catch(error);
}
