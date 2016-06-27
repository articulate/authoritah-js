import fs from 'fs'
import loadScript from '../../src/utils/loadScript'
import rule from '../fixtures/rule.json'


describe("loadScript", () => {
  const result = loadScript('script', rule);

  it('loads script file and replaces the value of the given field', () => {
    expect(result.script).to.equal(fs.readFileSync(rule.script).toString());
  });
});
