import fs from 'fs'
import prepareRule from '../../src/auth0/prepareRule'
import rule from '../fixtures/rule.json'

describe("prepareRule", () => {
  const uuidNameTest = (result) => () => expect(result.name).to.equal(`${rule.uuid} ${rule.name}`);

  context('create', () => {
    const prepareFn = prepareRule('create');
    const result = prepareFn(rule);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['name', 'script', 'enabled', 'stage', 'order']);
    });

    it('combines uuid and name', uuidNameTest(result));
  });

  context('update', () => {
    const prepareFn = prepareRule('update');
    const result = prepareFn(rule);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['name', 'script', 'enabled', 'order']);
    });

    it('combines uuid and name', uuidNameTest(result));
  });
});
