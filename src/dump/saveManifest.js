import yaml from 'js-yaml'
import fs from 'fs'
import R from 'ramda'

const dropField = (field) => R.map(R.omit([field]));
const formatter = R.ifElse(R.equals('json'),
  R.always(R.curry(JSON.stringify)(R.__, null, 2)),
  R.always(R.curry(yaml.dump)(R.__, {noRefs: true})));

const selectTypes = R.pick(['rules', 'connections', 'clients']);
const transformations = {
  rules: dropField('id'),
  connections: dropField('id'),
  clients: dropField('client_id'),
};

export default function saveManifest(filename) {
  const writer = R.partial(fs.writeFileSync, [filename]);

  return function(context) {
    const { options: { format } } = context;
    return R.compose(writer, formatter(format), R.evolve(transformations), selectTypes)(context);
  }
}
