import yaml from 'js-yaml'
import fs from 'fs'
import R from 'ramda'
import promisify from '../utils/promisify'

const formatter = R.ifElse(R.equals('json'),
  R.always(R.curry(JSON.stringify)(R.__, null, 2)),
  R.always(R.curry(yaml.dump)(R.__, {noRefs: true})));

const filterOptions = R.over(R.lensProp('options'), R.pick(["customScripts"]));
const selectTypes = R.pick(['rules', 'connections', 'clients']);

const transformations = {
  rules: R.map(R.omit(['id'])),
  connections: R.map(R.compose(filterOptions, R.omit('id'))),
  clients: R.map(R.omit(['client_id'])),
};

export default function saveManifest(filename) {
  const writer = promisify(R.partial(fs.writeFile, [filename]));

  return function(context) {
    const { options: { format } } = context;
    return R.compose(writer, formatter(format), R.evolve(transformations), selectTypes)(context)
      .then(context);
  }
}
