import parseClients from '../../src/transformers/clients/parseClients'
import clients from '../fixtures/clients.json'

describe("parseClients", () => {
  const result = parseClients({ clients }).clients;

  it('extracts uuid from name', () => {
    expect(result[0]).to.have.any.keys(['name', 'uuid']);
  });

  it('associates a uuid if one is not present', () => {
    expect(result[0].uuid).to.match(/[\w_-]{16}/);
  });
});
