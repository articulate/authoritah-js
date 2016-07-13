import fs from 'fs'
import prepareForCreate from '../../src/transformers/rules/prepareRuleForCreate'
import prepareForUpdate from '../../src/transformers/rules/prepareRuleForUpdate'
import rule from '../fixtures/rule.json'

describe("prepareRule", () => {
  const uuidNameTest = (result) => () => expect(result.name).to.equal(`${rule.uuid} ${rule.name}`);

  context('create', () => {
    const result = prepareForCreate(rule);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['name', 'script', 'enabled', 'stage', 'order']);
    });

    it('combines uuid and name', uuidNameTest(result));
  });

  context('update', () => {
    const result = prepareForUpdate(rule);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['name', 'script', 'enabled', 'order']);
    });

    it('combines uuid and name', uuidNameTest(result));
  });
});
