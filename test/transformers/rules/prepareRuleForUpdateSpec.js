import prepare from '../../../src/transformers/rules/prepareRuleForUpdate'
import rule from '../../fixtures/rule.json'

describe("prepareRuleForUpdate", () => {
  const result = prepare(rule);

  it('selects fields', () => {
    expect(result).to.not.have.all.keys(['id', 'stage']);
  });
});
