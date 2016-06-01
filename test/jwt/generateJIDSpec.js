import generateJID from '../../src/jwt/generateJID'

describe("generateJID", () => {
  context('when jid not present', () => {
    it('associate a JID', () => {
      expect(generateJID({abc: 123})).to.have.any.key('jid');
    });

    it('generates a 32 char hex string', () => {
      expect(generateJID({abc: 123}).jid.length).to.eq(32);
    });
  });

  context('when jid not present', () => {
    const test = {jid: '123'};
    it('does not generate a JID', () => {
      expect(generateJID(test)).to.equal(test);
    });
  });

});
