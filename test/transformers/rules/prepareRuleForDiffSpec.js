import prepare from '../../../src/transformers/rules/prepareRuleForDiff'
import rule from '../../fixtures/rule.json'

describe("prepareRuleForDiff", () => {
  const result = prepare(rule);

  it('selects fields', () => {
    expect(result).to.have.all.keys(['script', 'stage', 'enabled', 'name', 'order']);
  });
});
