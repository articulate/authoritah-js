import R from 'ramda'

export default function associateClientConnections(context) {
  const { clients } = context;
  const findClients = (ids) => R.filter(R.compose(
    R.flip(R.contains)(ids),
    R.prop('client_id')
  ), clients);
  const retrieveIds = R.compose(R.pluck('uuid'), findClients);
  const associateClient = R.over(R.lensProp('enabled_clients'), retrieveIds);

  return R.over(R.lensProp('connections'), R.map(associateClient), context);
}
