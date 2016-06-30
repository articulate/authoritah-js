import associate from '../../src/dump/associateClientConnections'
import connections from '../fixtures/connections.json'
import clients from '../fixtures/clients.json'

const context = { connections, clients };

describe("associateClientConnections", () => {
  const { connections: [first, second] } = associate(context);

  it('associates clients with connections by the assigned uuid', () => {
    expect(first.enabled_clients).to.eql(["4567"]);
  });

  it('can deal with multiple clients', () => {
    expect(second.enabled_clients).to.eql(["4567", "1234"]);
  });
});
