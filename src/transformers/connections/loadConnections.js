import R from 'ramda'
import loadScript from '../../utils/loadScript'

const copyNameAsUUID = R.over(R.lens(R.prop('name'), R.assoc('uuid')), R.identity);

// Connections require a bit of manipulation to work with the `loadScript` function expectations
const loadConnectionScripts = R.over(R.lensPath(['options', 'customScripts']),
  R.mapObjIndexed((_, key, object) => loadScript(key, object)[key]));

const loadConnections = R.map(R.compose(loadConnectionScripts, copyNameAsUUID));
export default loadConnections;
