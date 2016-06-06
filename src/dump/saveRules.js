import fs from 'fs'
import yaml from 'js-yaml'
import { assoc, dissoc, compose, map, partial } from 'ramda'

const scriptName = (name) => { return name.toLowerCase().replace(/\s/g, "_") }

function saveScript(dir, rule) {
  const { script, name } = rule;
  const path = `${dir}/${scriptName(name)}.js`;

  fs.writeFileSync(path, script);
  return compose(assoc('script_file', path), dissoc('script'))(rule);
}

function ensureScriptDir(dir) {
  try {
    fs.mkdirSync(dir);
  } catch(e) {
    // ignore
  }
}

export default function saveRules(filename) {
  const writeYaml = compose(partial(fs.writeFileSync, [filename]), yaml.dump);

  return function(context) {
    const { rules, options: { scripts } } = context;
    const saveTo = partial(saveScript, [scripts]);

    ensureScriptDir(scripts);

    return compose(writeYaml, map(saveTo))(rules);
  }
}
