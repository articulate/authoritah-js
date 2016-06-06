import loadEnv from '../../src/utils/loadEnv'
import generateJWT from '../../src/jwt/generateJWT'
import configManager from '../../src/config/configManager'

const config = configManager('./test/fixtures/jwt.json');

const ctx = {
  config,
  options: {
    key: '123',
    secret: '456'
  }
};

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMjMiLCJzY29wZXMiOnsicnVsZXMiOnsiYWN0aW9ucyI6WyJyZWFkIiwidXBkYXRlIiwiZGVsZXRlIiwiY3JlYXRlIl19fSwiaWF0IjoxNDY1MjI4MjMwMDM2LCJqdGkiOiIxMjMifQ._Fg1RCxrLrMula3DvXZOl4Puq4IF5qRLqSDa_dFjmx8';

describe("generateJWT", () => {
  beforeEach(() => {
    config.set('jwt.createdAt', 1465228230036);
    config.set('jwt.uid', '123');
  });

  it('can generate a repeatable JWT', () => {
    const result = generateJWT(ctx);
    return expect(result).to.equal(jwt);
  });

  it('can generate a fresh JWT', () => {
    ctx.options.refresh = true;
    const result = generateJWT(ctx);

    expect(result).not.to.equal(jwt);
    expect(config.get('jwt.uid')).not.to.eq('123');
  });
});
