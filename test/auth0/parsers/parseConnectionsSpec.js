import parseConnections from '../../../src/auth0/parsers/parseConnections'
import connections from '../../fixtures/connections.json'

describe("parseConnections", () => {
  const { connections: result } = parseConnections({ connections });

  context('transforms connections from API to the manifest representation', () => {
    it('extracts needed fields', () => {
      expect(result[0]).to.have.all.keys(["id", "name", "uuid", 'options', 'strategy', 'enabled_clients']);
    });

    it('splits uuid from name', () => {
      expect(result[1].name).to.eq("Username-Password-Authentication");
      expect(result[1].uuid).to.eq("4F686A07-2DB8-4941-99C7-86DEB3F4D20C")
    });

    it('filters options', () => {
      expect(result[1].options).to.have.all.keys(['customScripts']);
    });
  });
});
