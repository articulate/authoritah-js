import R from 'ramda'
import prepare from '../../../src/transformers/clients/prepareClientForUpdate'
import clients from '../../fixtures/clients.json'

describe("prepare clients for update", () => {
  const results = R.map(prepare, clients);

  it('drops all unusuable fields', () => {
    expect(results[0]).to.not.have.all.keys(['client_id', 'callback_url_template', 'tenant', 'global', 'config_route', 'owners']);
  });

  it('drops any null fields', () => {
    expect(results[2]).to.not.have.all.keys(['allowed_clients', 'allowed_logout_urls']);
  });
});
