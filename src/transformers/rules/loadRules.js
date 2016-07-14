import R from 'ramda'
import loadScript from '../../utils/loadScript'

const loadRules = R.map(loadScript('script'));
export default loadRules;
