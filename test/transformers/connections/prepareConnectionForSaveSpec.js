import prepare from '../../../src/transformers/connections/prepareConnectionForSave'
import conn from '../../fixtures/connection.json'

describe("prepareConnectionForSave", () => {
  const result = prepare(conn);

  it('filters top-level fields', () => {
    expect(result).to.have.all.keys(['name', 'options', 'strategy', 'enabled_clients']);
  });

  it('only passes through custom scripts', () => {
    expect(result.options).to.have.all.keys(['customScripts']);
  });
});
