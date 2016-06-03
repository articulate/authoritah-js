import generateJID from '../../src/jwt/generateUID'

describe("generateUID", () => {
  context('when jid not present', () => {
    it('associate a UID', () => {
      expect(generateJID({abc: 123})).to.have.any.key('uid');
    });

    it('generates a 32 char hex string', () => {
      expect(generateJID({abc: 123}).uid.length).to.eq(32);
    });
  });

  context('when uid not present', () => {
    const test = {uid: '123'};
    it('does not generate a UID', () => {
      expect(generateJID(test)).to.equal(test);
    });
  });

});
