import R from 'ramda'
import saveScripts from '../utils/saveScripts'
import { expandObject, combineObject } from '../transformers/objectManipulation'

const ruleLens = R.lensPath(['options', 'customScripts']);

const transformForSave = (saveFn) => R.over(ruleLens, R.compose(R.map(saveFn), expandObject('name', 'script')));
const transformForWrite = R.over(ruleLens, combineObject('name', 'script'));

export default function saveConnections(context) {
  const { connections, options: { connectionScripts } } = context;

  const saveAndWrite = R.map((connection) => {
    const { name, options: { customScripts }} = connection;
    if(R.isNil(customScripts)) { return connection; }

    const saveScriptTo = saveScripts(`${connectionScripts}/${name}`);
    return R.compose(transformForWrite, transformForSave(saveScriptTo))(connection);
  });

  return R.assoc('connections', saveAndWrite(connections), context);
}

