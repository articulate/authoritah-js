import R from 'ramda'
import { extractUuid } from '../transformUuidName'

const transformEach = R.map(extractUuid);
const parseRules = R.over(R.lensProp('rules'), transformEach);

export default parseRules;
