import R from 'ramda'
import fs from 'fs'
import loadRules from '../../../src/transformers/rules/loadRules'
import yaml from 'js-yaml'

describe("loading rules from manifest", () => {
  const { rules } = R.compose(yaml.load, fs.readFileSync)('./test/fixtures/demo.yml');
  const result = loadRules(rules);

  it('loads rule scripts', () => {
    const scripts = R.pluck('script', result);
    const scriptContent = fs.readFileSync('./test/fixtures/dummy_scripts/dummy.js')
      .toString();

    expect(R.all(R.equals(scriptContent), scripts)).to.be.true;
  });
});
