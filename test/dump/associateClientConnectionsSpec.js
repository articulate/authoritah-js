import R from 'ramda'
import { associate, disassociate } from '../../src/dump/associateClientConnections'
import connections from '../fixtures/connections.json'
import clients from '../fixtures/clients.json'

const fixture = { connections, clients };

describe("connection to client mapping", () => {
  const { connections } = associate(fixture);

  context('associate', () => {
    const [first, second] = connections;

    it('associates clients with connections by the assigned uuid', () => {
      expect(first.enabled_clients).to.eql(["4567"]);
    });

    it('can deal with multiple clients', () => {
      expect(second.enabled_clients).to.eql(["4567", "1234"]);
    });
  });

  context('disassociate', () => {
    const { manifest: { connections: [first, second] } } = disassociate(R.merge({ manifest: { connections }}, fixture));

    it('re-associates clients with connections by the client_id', () => {
      expect(first.enabled_clients).to.eql(["Mcu3TfMct0lsCAuEdcYkIRH2vh0aQ6J9"]);
    });

    it('can deal with multiple clients', () => {
      expect(second.enabled_clients).to.eql(["Mcu3TfMct0lsCAuEdcYkIRH2vh0aQ6J9", "Mm5BRBNFQqKB7sSGeRefMAzUMev6QuJ7"]);
    });
  });

});
