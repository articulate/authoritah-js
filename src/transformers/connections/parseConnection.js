import R from 'ramda';
import { extractUuid } from '../../transformers/transformUuidName'

const transformEach = R.map(extractUuid);
const parseConnections = R.over(R.lensProp('connections'), transformEach);

export default parseConnections;
