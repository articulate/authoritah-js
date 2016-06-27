import fs from 'fs'
import prepareConnection from '../../src/auth0/prepareConnection'
import conn from '../fixtures/connection.json'

describe("prepareRule", () => {
  const result = prepareConnection(conn);

  it('selects fields', () => {
    expect(result).to.have.all.keys(['name', 'options']);
  });

  it('combines uuid and name', () => {
    expect(result.name).to.equal(`${conn.uuid}-${conn.name}`);
  });
});
