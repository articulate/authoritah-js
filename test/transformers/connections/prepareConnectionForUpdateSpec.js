import prepare from '../../../src/transformers/connections/prepareConnectionForUpdate'
import conn from '../../fixtures/connection.json'

describe("prepareConnectionForUpdate", () => {
  const result = prepare(conn);

  it('selects fields', () => {
    expect(result).to.not.have.all.keys(['id', 'name', 'strategy']);
  });
});
