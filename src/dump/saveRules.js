import fs from 'fs'
import yaml from 'js-yaml'
import R from 'ramda'

const scriptName = (name) => { return name.toLowerCase().replace(/\s/g, "_") }

function saveScript(dir, rule) {
  const { script, name } = rule;
  const path = `${dir}/${scriptName(name)}.js`;

  fs.writeFileSync(path, script);
  return R.compose(R.assoc('script_file', path), R.dissoc('script'))(rule);
}

function ensureScriptDir(dir) {
  try {
    fs.mkdirSync(dir);
  } catch(e) {
    // ignore
  }
}

const formatter = R.ifElse(R.equals('json'),
                           R.always(R.curry(JSON.stringify)(R.__, null, 2)),
                           R.always(yaml.dump));

export default function saveRules(filename) {
  return function(context) {
    const { rules, options: { format, scripts } } = context;
    const saveTo = R.partial(saveScript, [scripts]);
    const write = R.compose(R.partial(fs.writeFileSync, [filename]), formatter(format));

    ensureScriptDir(scripts);

    return R.compose(write, R.map(saveTo))(rules);
  }
}
