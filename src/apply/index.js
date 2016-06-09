import loadEnv from '../utils/loadEnv'
import say from '../utils/say'

import loadManifest from '../apply/loadManifest'
import setupClient from '../utils/setupClient'
import fetchRules from '../auth0/fetchRules'
import addRules from '../auth0/addRules'
import updateRules from '../auth0/updateRules'
import removeRules from '../auth0/removeRules'
import diff from './diff'

export default function index(filename='./rules.yml', options) {
  const { ok, error, say: sayHey } = say(options);

  return loadEnv(options)
    .then(loadManifest(filename))
    .then(setupClient)
    .then(fetchRules)
    .then(diff)
    .then(removeRules)
    .then(updateRules)
    .then(addRules)
    .catch(error);
}
