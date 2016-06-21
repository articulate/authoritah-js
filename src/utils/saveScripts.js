import fs from 'fs'
import R from 'ramda'

const scriptName = (name) => { return name.toLowerCase().replace(/\s/g, "_") }

function ensureScriptDir(dir) {
  try {
    fs.mkdirSync(dir);
  } catch(e) {
    // ignore
  }
}

// Constructs a function that saves a given script definition
// (form of `{ script, name }`) to a file
export default function saveScripts(dir) {
  ensureScriptDir(dir);

  return function(scriptDefn) {
    const { script, name } = scriptDefn;
    const path = `${dir}/${scriptName(name)}.js`;

    fs.writeFileSync(path, script);
    return R.compose(R.assoc('script_file', path), R.dissoc('script'))(scriptDefn);
  }
}
