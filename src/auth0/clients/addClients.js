import R from 'ramda'
import {prepareClient} from '../../transformers/clients/prepareClientForDiff'
import apiCallWrapper from '../../utils/apiCallWrapper'

export default function addClients(context) {
  const { diff: { clients: { adds } } } = context;
  const createFn = apiCallWrapper("clients.create", context);
  const addClient = R.compose(createFn, prepareClient);

  return Promise.all(R.map(addClient, adds))
    .then(_ => context);
}
