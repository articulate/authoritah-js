import R from 'ramda'
import prepareForCreate from '../../transformers/connections/prepareConnectionForCreate'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function addConnections(context) {
  const { diff: { connections: { adds } } } = context;
  const addFn = apiCallWrapper('connections.create', context);
  const addConnection = R.compose(addFn, prepareForCreate);

  return Promise.all(R.map(addConnection, adds))
    .then(_ => context);
}
