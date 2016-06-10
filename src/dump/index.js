import loadEnv from '../utils/loadEnv'
import setupClient from '../utils/setupClient'
import say from '../utils/say'

import fetchRules from '../auth0/fetchRules'
import saveRules from './saveRules'

export default function index(filePath, options) {
  const { format } = options;
  const { error, ok } = say(options);

  const ext = format == "json" ? "json" : "yml"
  const filename = filePath ? filePath : `rules.${ext}`;

  return loadEnv(options)
    .then(setupClient)
    .then(fetchRules)
    .then(saveRules(filename))
    .then(ok(`Rules written to ${filename}`))
    .catch(error);
}
