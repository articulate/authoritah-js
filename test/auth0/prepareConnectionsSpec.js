import fs from 'fs'
import prepareForCreate from '../../src/transformers/connections/prepareConnectionForCreate'
import prepareForUpdate from '../../src/transformers/connections/prepareConnectionForUpdate'
import conn from '../fixtures/connection.json'

describe("prepareConnection", () => {
  context('create', () => {
    const result = prepareForCreate(conn);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['name', 'options', 'strategy', 'enabled_clients']);
    });
  });

  context('update', () => {
    const result = prepareForUpdate(conn);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['options', 'enabled_clients']);
    });
  });
});
