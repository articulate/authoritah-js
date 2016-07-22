import prepare from '../../../src/transformers/clients/prepareClientForDiff'
import clients from '../../fixtures/clients.json'

describe("prepareClientForDiff", () => {
  const result = prepare(clients[0]);

  it('selects fields', () => {
    expect(result).to.have.all.keys(['name']);
  });
});
