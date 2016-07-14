import parseConnections from '../../src/transformers/connections/parseConnection'
import connections from '../fixtures/connections.json'

describe("parseConnections", () => {
  const { connections: result } = parseConnections({ connections });

  context('transforms connections from API to the manifest representation', () => {
    it('copies name as uuid', () => {
      expect(result[1].name).to.eq(result[1].uuid)
    });

    it('passes through options', () => {
      expect(result[1].options).to.have.all.keys([
        "brute_force_protection",
        "configuration",
        "customScripts",
        "enabledDatabaseCustomization"
      ]);
    });
  });
});
