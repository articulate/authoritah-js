import fs from 'fs'
import R from 'ramda'
import yaml from 'js-yaml'
import loadScript from '../utils/loadScript'

// Connections require a bit of manipulation to work with the `loadScript` function expectations
const loadConnectionScripts = R.over(R.lensPath(['options', 'customScripts']),
  R.mapObjIndexed((_, key, object) => loadScript(key, object)[key]));

const transformations = {
  rules: R.map(loadScript('script')),
  connections: R.map(loadConnectionScripts),
}

export default function loadManifest(filename) {
  const parser = filename.endsWith("json") ? JSON.parse : yaml.load;
  const manifest = R.compose(parser, fs.readFileSync)(filename);

  return R.assoc('manifest', R.evolve(transformations, manifest));
}
