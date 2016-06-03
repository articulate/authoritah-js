import generateJWT from '../../src/jwt/generateJWT'

const managedContext = {
  key: '123',
  secret: '456',
  uid: '567',
  created_at: 1464799343600
};

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMjMiLCJzY29wZXMiOnsicnVsZXMiOnsiYWN0aW9ucyI6WyJyZWFkIiwidXBkYXRlIiwiZGVsZXRlIiwiY3JlYXRlIl19fSwiaWF0IjoxNDY0Nzk5MzQzNjAwLCJqdGkiOiI1NjcifQ.XqgX1IHKnTzCTLy8K4z5S7RC_AYPbQA8BFMrkg3At5c';

describe("generateWT", () => {
  const result = generateJWT(managedContext);

  it('can generate a repeatable JWT', () => {
    expect(result).to.equal(jwt);
  });

  it('can generate a fresh JWT', () => {
    expect(generateJWT({ key: '123', secret: '456' })).not.to.equal(jwt);
  });
});
