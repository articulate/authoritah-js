import R from 'ramda'
import findAllIn from '../findAllIn'

export default function disassociate(context) {
  const { clients } = context;
  const retrieveIds = R.compose(R.pluck('client_id'), findAllIn(clients, 'name'));
  const dissocClient = R.ifElse(R.has('enabled_clients'), R.over(R.lensProp('enabled_clients'), retrieveIds), R.identity);

  return R.over(R.lensPath(['manifest', 'connections']), R.map(dissocClient), context);
}
