import loadEnv from '../utils/loadEnv'
import say from '../utils/say'

import loadManifest from '../apply/loadManifest'
import setupClient from '../utils/setupClient'
import fetchRules from '../auth0/fetchRules'
import fetchConnections from '../auth0/fetchConnections'

import diff from './diff'
import applyDiff from './applyDiff'

export default function index(filename='./auth0.yml', options) {
  const { error } = say(options);

  return loadEnv(options)
    .then(loadManifest(filename))
    .then(setupClient)
    .then(fetchRules)
    .then(fetchConnections)
    .then(diff('rules'))
    .then(diff('connections'))
    .then(applyDiff)
    .catch(err => error(err.message));
}
