import R from 'ramda'

function findAllIn(collection, key) {
  return (ids) => R.filter(R.compose(
    R.flip(R.contains)(ids),
    R.prop(key)
  ), collection);
}

export function associate(context) {
  const { clients } = context;
  const retrieveIds = R.compose(R.pluck('name'), findAllIn(clients, 'client_id'));
  const associateClient = R.over(R.lensProp('enabled_clients'), retrieveIds);

  return R.over(R.lensProp('connections'), R.map(associateClient), context);
}

export function disassociate(context) {
  const { clients } = context;
  const retrieveIds = R.compose(R.pluck('client_id'), findAllIn(clients, 'name'));
  const associateClient = R.over(R.lensProp('enabled_clients'), retrieveIds);

  return R.over(R.lensPath(['manifest', 'connections']), R.map(associateClient), context);
}
