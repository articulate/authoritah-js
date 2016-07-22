import R from 'ramda'
import fs from 'fs'
import loadConnections from '../../../src/transformers/connections/loadConnections'
import yaml from 'js-yaml'

describe("loading connections from manifest", () => {
  const { connections } = R.compose(yaml.load, fs.readFileSync)('./test/fixtures/demo.yml');
  const result = loadConnections(connections);

  it('loads connection scripts', () => {
    const { login, get_user } = R.path([1, 'options', 'customScripts'], result);
    const scriptContent = fs.readFileSync('./test/fixtures/dummy_scripts/dummy.js')
      .toString();

    expect(login).to.equal(scriptContent);
    expect(get_user).to.equal(scriptContent)
  });
});
