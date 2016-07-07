import R from 'ramda';
import { extractUuid } from '../../utils/transformUuidName'

const filterFields = R.pick([
  'name',
  'id',
  'options',
  'strategy',
  'enabled_clients',
]);
const transformEach = R.map(R.compose(extractUuid, filterFields));

export default function parseConnections(context) {
  const { connections } = context;

  return R.assoc('connections', transformEach(connections), context);
}
