import R from 'ramda'
import disassociate from '../../src/utils/clientConnections/disassociate'
import associate from '../../src/utils/clientConnections/associate'

import connections from '../fixtures/connections.json'
import clients from '../fixtures/clients.json'

const fixture = { connections, clients };

describe("connection to client mapping", () => {
  const { connections: assocConnections } = associate(fixture);
  const withManifest = R.merge({ manifest: { connections: assocConnections }}, fixture);

  context('associate', () => {
    const [first, second] = assocConnections;

    it('associates clients with connections by the assigned name', () => {
      expect(first.enabled_clients).to.eql(["google-auth"]);
    });

    it('can deal with multiple clients', () => {
      expect(second.enabled_clients).to.eql(["google-auth", "machines-rule"]);
    });

    it('ignores when missing', () => {
      const modified = R.dissocPath([0, 'enabled_clients'], connections);
      const fixture = { connections: modified, clients };

      const { connections: assocConnections } = associate(fixture);

      expect(assocConnections[0].enabled_clients).to.be.undefined;
    });
  });

  context('disassociate', () => {
    const { manifest: { connections: [first, second] } } = disassociate(withManifest);
    const [origFirst, origSecond] = connections;

    it('re-associates clients with connections by the client_id', () => {
      expect(first.enabled_clients).to.eql(origFirst.enabled_clients);
    });

    it('can deal with multiple clients', () => {
      expect(second.enabled_clients).to.eql(origSecond.enabled_clients);
    });

    it('ignores when missing', () => {
      const modified = R.compose(
        R.dissocPath(['manifest', 'connections', 0, 'enabled_clients']),
        R.dissocPath(['connections', 0, 'enabled_clients'])
      )(withManifest);

      const result = disassociate(modified);

      expect(result.manifest.connections[0].enabled_clients).to.be.undefined;
    });
  });
});
