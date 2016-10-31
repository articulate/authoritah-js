import fs from 'fs-extra'
import R from 'ramda'

const scriptName = (name) => { return name.toLowerCase().replace(/\s/g, "_") }

// Constructs a function that saves a given script definition
// (form of `{ script, name }`) to a file
export default function saveScripts(dir) {
  return function(scriptDefn) {
    const { script, name } = scriptDefn;
    const path = `${dir}/${scriptName(name)}.js`;

    if(script) { fs.ensureDirSync(dir); }

    fs.writeFileSync(path, script);
    return R.assoc('script', path, scriptDefn);
  }
}
