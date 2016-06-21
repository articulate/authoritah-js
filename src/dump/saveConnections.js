import fs from 'fs'
import R from 'ramda'
import saveScripts from '../utils/saveScripts'

const ruleLens = R.lens(R.prop('customScripts'), R.assoc('customScripts'));
const transformForSave = R.compose(R.values, R.mapObjIndexed((script, name) => ({ name, script })));
const transform = (saveFn) => R.over(ruleLens, R.compose(R.map(saveFn), transformForSave));

export default function saveConnections(context) {
  const { connections, options: { connectionScripts } } = context;
  const saveScriptTo = saveScripts(connectionScripts);

  return R.assoc('connections', R.map(transform(saveScriptTo), connections), context);
}

