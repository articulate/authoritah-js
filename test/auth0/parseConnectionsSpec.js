import parseConnections from '../../src/transformers/connections/parseConnection'
import connections from '../fixtures/connections.json'

describe("parseConnections", () => {
  const { connections: result } = parseConnections({ connections });

  context('transforms connections from API to the manifest representation', () => {
    it('splits uuid from name', () => {
      expect(result[1].name).to.eq("Username-Password-Authentication");
      expect(result[1].uuid).to.eq("4F686A07-2DB8-4941-99C7-86DEB3F4D20C")
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
