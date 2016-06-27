import fs from 'fs'
import R from 'ramda'

function loadScript(field, object) {
  const { [field]: script_file } = object;
  const script = fs.readFileSync(script_file).toString();

  return R.assoc(field, script, object);
}

export default R.curry(loadScript);
