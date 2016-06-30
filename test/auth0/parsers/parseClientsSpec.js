import parseClients from '../../../src/auth0/parsers/parseClients'
import clients from '../../fixtures/clients.json'

describe("parseClients", () => {
  const result = parseClients({ clients }).clients;

  it('extracts desired fields', () => {
    expect(result[0]).to.have.all.keys(['client_id', 'name', 'uuid']);
  });

  it('associates a uuid if one is not present', () => {
    expect(result[0].uuid).to.match(/[\w_-]{16}/);
  });
});
