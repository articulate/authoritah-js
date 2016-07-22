import fs from 'fs'
import prepareForUpdate from '../../src/transformers/rules/prepareRuleForUpdate'
import rule from '../fixtures/rule.json'

describe("prepareRule", () => {
  context('update', () => {
    const result = prepareForUpdate(rule);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['name', 'script', 'enabled', 'order']);
    });
  });
});
