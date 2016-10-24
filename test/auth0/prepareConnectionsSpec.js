import prepareForUpdate from '../../src/transformers/connections/prepareConnectionForUpdate'
import conn from '../fixtures/connection.json'

describe("prepareConnection", () => {
  context('update', () => {
    const result = prepareForUpdate([conn, conn]);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['options', 'enabled_clients']);
    });
  });
});
