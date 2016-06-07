import loadEnv from '../utils/loadEnv'
import say from '../utils/say'

import loadManifest from '../apply/loadManifest'
import setupClient from '../utils/setupClient'
import fetchRules from '../auth0/fetchRules'
import diff from './diff'

export default function index(filename='./rules.yml', options) {
  const { ok, error, say: sayHey } = say(options);

  return loadEnv(options)
    .then(loadManifest(filename))
    .then(setupClient)
    .then(fetchRules)
    .then(diff)
    .then(sayHey)
    .catch(console.error);
}
