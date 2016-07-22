import prepare from '../../../src/transformers/rules/prepareRuleForSave'
import rule from '../../fixtures/rule.json'

describe("prepareRuleForSave", () => {
  const result = prepare(rule);

  it('selects fields', () => {
    expect(result).to.have.all.keys(['script', 'stage', 'enabled', 'name', 'order']);
  });
});
