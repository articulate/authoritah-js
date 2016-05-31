import randomHex from '../../src/utils/randomHex'

describe("randomHex", () => {
  const promise = randomHex();

  context('generates a random hex value', () => {
    it('of known length', () => {
      return promise.then(val => expect(val.length).to.equal(32));
    });

    it('which is a string', () => {
      return promise.then(val => expect(val).to.be.a('string'));
    });
  });
});
