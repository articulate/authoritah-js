import R from 'ramda'
import prepare from '../../transformers/connections/prepareConnectionForUpdate'
import apiErrorHandler from '../../utils/apiErrorHandler'

const getId = R.compose(R.pick(['id']), R.head);
export default function updateConnections(context) {
  const { client, diff: { connections: { changes } }, say: { notice } } = context;
  const print = ({name}) => notice("Updated connection: " , name);
  const updateFn = (obj) =>
    client.connections.update(getId(obj), prepare(obj))
      .then(print)
      .catch(apiErrorHandler(obj, "updating connection", context));

  return Promise.all(R.map(updateFn, changes))
    .then(_ => context);
}
