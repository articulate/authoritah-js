import fs from 'fs'
import prepareConnection from '../../src/auth0/prepareConnection'
import conn from '../fixtures/connection.json'

describe("prepareRule", () => {
  context('create', () => {
    const result = prepareConnection('create')(conn);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['name', 'options', 'strategy', 'enabled_clients']);
    });

    it('combines uuid and name', () => {
      expect(result.name).to.equal(`${conn.uuid}-${conn.name}`);
    });
  });

  context('update', () => {
    const result = prepareConnection('update')(conn);

    it('selects fields', () => {
      expect(result).to.have.all.keys(['options', 'enabled_clients']);
    });
  });
});
