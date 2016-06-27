import R from 'ramda';
import { extractUuid } from '../utils/transformUuidName'

const filterFields = R.pick([
  'name',
  'id',
  'options',
  'strategy',
]);
const filterOptions = R.over(R.lensProp('options'), R.pick(["configuration", "customScripts"]));
const transformEach = R.map(R.compose(extractUuid, filterFields, filterOptions));

export default function parseConnections(context) {
  const { connections } = context;

  return R.assoc('connections', transformEach(connections), context);
}
