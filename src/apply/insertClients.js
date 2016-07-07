import R from 'ramda'

const groupByName = R.compose(R.groupBy(R.prop('name')), R.concat);
const pairNotEqual = R.apply(R.complement(R.eqProps('uuid')));
const missingIds = R.compose(R.not, R.isNil, R.prop('client_id'));

export default function insertClients(context) {
  const {
    clients: server,
    manifest: { clients: local }
  } = context;

  const filtered = R.compose(R.filter(missingIds), R.values, R.map(R.mergeAll), R.filter(pairNotEqual), groupByName)(server, local);

  return R.assocPath(['diff', 'clients', 'changes'], filtered, context);
}
