import R from 'ramda'
import { extractUuid } from '../../utils/transformUuidName'

const filterFields = R.pick([
  'client_id',
  'name',
]);

const transformEach = R.map(R.compose(extractUuid, filterFields));
const parseClients = R.over(R.lensProp('clients'), transformEach);

export default parseClients;
