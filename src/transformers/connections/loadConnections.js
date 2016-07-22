import R from 'ramda'
import loadScript from '../../utils/loadScript'

// Connections require a bit of manipulation to work with the
// `loadScript` function expectations
const loadConnectionScripts = R.over(R.lensPath(['options', 'customScripts']),
  R.mapObjIndexed((_, key, object) => loadScript(key, object)[key]));

const loadConnections = R.map(loadConnectionScripts);
export default loadConnections;
