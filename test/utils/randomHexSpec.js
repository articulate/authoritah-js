import randomHex from '../../src/utils/randomHex'

describe("randomHex", () => {
  const promise = randomHex('id')({});

  context('generates a random hex value', () => {
    it('of known length', () => {
      return promise.then(val => expect(val.id.length).to.equal(32));
    });

    it('which is a string', () => {
      return promise.then(val => expect(val.id).to.be.a('string'));
    });
  });
});
