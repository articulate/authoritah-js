import loadEnv from '../utils/loadEnv'
import say from '../utils/say'

import loadManifest from '../apply/loadManifest'
import setupClient from '../utils/setupClient'
import fetchRules from '../auth0/fetchRules'
import fetchConnections from '../auth0/fetchConnections'
import diff from './diff'

import addRules from '../auth0/addRules'
import updateRules from '../auth0/updateRules'
import removeRules from '../auth0/removeRules'

import addConnections from '../auth0/addConnections'
import updateConnections from '../auth0/updateConnections'
import removeConnections from '../auth0/removeConnections'


export default function index(filename='./auth0.yml', options) {
  const { error } = say(options);

  return loadEnv(options)
    .then(loadManifest(filename))
    .then(setupClient)
    .then(fetchRules)
    .then(fetchConnections)
    .then(diff('rules'))
    .then(diff('connections'))
    .then(removeRules)
    .then(updateRules)
    .then(addRules)
    .then(removeConnections)
    .then(updateConnections)
    .then(addConnections)
    .catch(error);
}
