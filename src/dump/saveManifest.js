import yaml from 'js-yaml'
import fs from 'fs'
import R from 'ramda'

const dropId = R.map(R.omit(["id"]));
const formatter = R.ifElse(R.equals('json'),
  R.always(R.curry(JSON.stringify)(R.__, null, 2)),
  R.always(R.curry(yaml.dump)(R.__, {noRefs: true})));

export default function saveManifest(filename) {
  const writer = R.partial(fs.writeFileSync, [filename]);

  return function(context) {
    const { rules, connections, options: { format } } = context;

    return R.compose(writer, formatter(format), R.mergeAll)({
      rules: dropId(rules),
      connections: dropId(connections)
    });
  }
}
