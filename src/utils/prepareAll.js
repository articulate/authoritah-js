import loadEnv from '../utils/loadEnv'
import loadManifest from '../apply/loadManifest'
import setupClient from '../utils/setupClient'
import fetchRules from '../auth0/rules/fetchRules'
import fetchConnections from '../auth0/connections/fetchConnections'
import fetchClients from '../auth0/clients/fetchClients'
import { disassociate } from '../utils/associateClientConnections'

export default function prepareAll(filename, options) {
  return loadEnv(options)
    .then(loadManifest(filename))
    .then(setupClient)
    .then(fetchRules)
    .then(fetchConnections)
    .then(fetchClients)
    .then(disassociate)
}
