import prepare from '../../../src/transformers/clients/prepareClientForSave'
import clients from '../../fixtures/clients.json'

describe("prepareClientForSave", () => {
  const result = prepare(clients[0]);

  it('selects fields', () => {
    expect(result).to.have.all.keys(['name']);
  });
});
