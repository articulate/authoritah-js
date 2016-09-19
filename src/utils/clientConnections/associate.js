import R from 'ramda'
import findAllIn from '../findAllIn'

export default function associate(context) {
  const { clients } = context;
  const retrieveIds = R.compose(R.pluck('name'), findAllIn(clients, 'client_id'));
  const associateClient = R.ifElse(R.has('enabled_clients'), R.over(R.lensProp('enabled_clients'), retrieveIds), R.identity);

  return R.over(R.lensProp('connections'), R.map(associateClient), context);
}
