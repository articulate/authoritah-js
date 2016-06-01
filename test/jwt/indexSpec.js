import jwt from '../../src/jwt/index'

describe("jwt index", () => {
  const result = jwt({
                       key: '123',
                       secret: '456',
                       jid: '567',
                       created_at: 1464799343600
                     });

  it('can generate a JWT', () => {
    return expect(result).to.eventually.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMjMiLCJzY29wZXMiOnsicnVsZXMiOnsiYWN0aW9ucyI6WyJyZWFkIiwidXBkYXRlIiwiZGVsZXRlIiwiY3JlYXRlIl19fSwiaWF0IjoxNDY0Nzk5MzQzNjAwLCJqdGkiOiI1NjcifQ.XqgX1IHKnTzCTLy8K4z5S7RC_AYPbQA8BFMrkg3At5c');
  });
});
