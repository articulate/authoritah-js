import R from 'ramda';
import { extractUuid } from '../../transformers/transformUuidName'

const copyNameAsUUID = R.over(R.lens(R.prop('name'), R.assoc('uuid')), R.identity);
const transformEach = R.map(copyNameAsUUID);
const parseConnections = R.over(R.lensProp('connections'), transformEach);

export default parseConnections;
