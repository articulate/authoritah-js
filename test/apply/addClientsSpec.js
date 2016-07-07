import R from 'ramda'
import insertClients from '../../src/apply/insertClients'

const server = [
  { uuid: '1234', name: 'google-auth', client_id: 'zzz' },
  { uuid: '5432', name: 'machines-rule', client_id: 'yyy' },
  { uuid: '7890', name: 'burniator', client_id: 'xxx' },
];

const local = [
  { uuid: '8888', name: 'google-auth' },
  { uuid: '4444', name: 'machines-rule' }
];

const context = {
  clients: server,
  manifest: { clients: local }
};

describe("insertClients", () => {
  const { diff: { clients: { changes: result }}} = insertClients(context);

  it("updates clients with updated UUIDs", () => {
    expect(R.pluck('uuid', result)).to.eql(['8888', '4444', '7890'])
  });
});
