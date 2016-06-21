import R from 'ramda';
import transformName from '../utils/transformUuidName'

const filterFields = R.pick([
                              'name',
                              'id',
                            ]);

const filterOptions = R.pick([
                               "configuration",
                               "customScripts"
                             ]);

function transform(connection) {
  const fields = R.compose(transformName, filterFields)(connection);
  return R.merge(fields, filterOptions(connection.options));
}

export default function parseConnections(context) {
  const { connections } = context;
  const parsed = R.map(transform, connections);

  return R.assoc('connections', parsed, context);
}
