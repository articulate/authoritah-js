import fs from 'fs'
import R from 'ramda'
import yaml from 'js-yaml'

import loadConnections from '../transformers/connections/loadConnections'
import loadRules from '../transformers/rules/loadRules'

const transformations = {
  rules: loadRules,
  connections: loadConnections,
};

export default function loadManifest(filename) {
  const parser = filename.endsWith("json") ? JSON.parse : yaml.load;
  const manifest = R.compose(parser, fs.readFileSync)(filename);

  return R.assoc('manifest', R.evolve(transformations, manifest));
}
