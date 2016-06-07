import yaml from 'js-yaml'
import fs from 'fs'
import { compose, assoc, dissoc, map } from 'ramda'

function loadScript(rule) {
  const { script_file } = rule;
  const script = fs.readFileSync(script_file).toString();

  return compose(assoc('script', script), dissoc('script_file'))(rule);
}

export default function loadManifest(filename) {
  const manifest = compose(yaml.load, fs.readFileSync)(filename);

  return function(context) {
    return assoc('manifest', map(loadScript, manifest), context);
  }
}
