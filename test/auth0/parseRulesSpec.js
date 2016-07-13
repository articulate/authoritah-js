import parseRules from '../../src/transformers/rules/parseRules'
import rules from '../fixtures/rules.json'

describe("parseRules", () => {
  const { rules: parsed } = parseRules({ rules });

  it('parses all rules', () => {
    expect(parsed.length).to.equal(4);
  });

  context("name and uuid", () => {
    const record = parsed[0];

    it('should extract name from uuid-name', () => {
      expect(record.name).to.equal('derp rule')
    });

    it('should extract uuid from uuid-name', () => {
      expect(record.uuid).to.equal('7CED37FE-FBA7-4264-BA37-E92D6F8B1FEC');
    });
  })
});
