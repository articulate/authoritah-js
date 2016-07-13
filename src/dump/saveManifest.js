import yaml from 'js-yaml'
import fs from 'fs'
import R from 'ramda'
import promisify from '../utils/promisify'

import ruleTransformer from '../transformers/rules/prepareRuleForSave'
import connectionTransformer from '../transformers/connections/prepareConnectionForSave'
import clientTransformer from '../transformers/clients/prepareClientForSave'

const formatter = R.ifElse(R.equals('json'),
  R.always(R.curry(JSON.stringify)(R.__, null, 2)),
  R.always(R.curry(yaml.dump)(R.__, {noRefs: true})));

const selectTypes = R.pick(['rules', 'connections', 'clients']);

const transformations = {
  rules: R.map(ruleTransformer),
  connections: R.map(connectionTransformer),
  clients: R.map(clientTransformer),
};

export default function saveManifest(filename) {
  const writer = promisify(R.partial(fs.writeFile, [filename]));

  return function(context) {
    const { options: { format } } = context;
    return R.compose(writer, formatter(format), R.evolve(transformations), selectTypes)(context)
      .then(context);
  }
}
