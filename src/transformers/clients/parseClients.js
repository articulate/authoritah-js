import R from 'ramda'
import { extractUuid } from '../../transformers/transformUuidName'

const copyClientId = R.over(R.lens(R.prop('client_id'), R.assoc('id')), R.identity);
const transformEach = R.map(R.compose(copyClientId, extractUuid));
const parseClients = R.over(R.lensProp('clients'), transformEach);

export default parseClients;
