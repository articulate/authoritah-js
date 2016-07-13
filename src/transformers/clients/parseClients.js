import R from 'ramda'
import { extractUuid } from '../../transformers/transformUuidName'

const transformEach = R.map(extractUuid);
const parseClients = R.over(R.lensProp('clients'), transformEach);

export default parseClients;
