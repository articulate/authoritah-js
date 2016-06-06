import loadEnv from '../utils/loadEnv'
import setupClient from '../utils/setupClient'
import say from '../utils/say'

import fetchRules from '../auth0/fetchRules'
import parseRules from '../auth0/parseRules'
import saveRules from './saveRules'

export default function index(filePath, options) {
  const { error, ok } = say(options);
  const filename = filePath ? filePath : "rules.yml";

  return loadEnv(options)
    .then(setupClient)
    .then(fetchRules)
    .then(parseRules)
    .then(saveRules(filename))
    .then(ok(`Rules written to ${filename}`))
    .catch(error);
}
