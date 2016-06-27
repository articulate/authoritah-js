import loadEnv from '../../src/utils/loadEnv'
import generateJWT from '../../src/jwt/generateJWT'
import configManager from '../../src/config/configManager'

const config = configManager('./test/fixtures/jwt.json');
const setConfig = () => {
  config.set('jwt.createdAt', 1465228230036);
  config.set('jwt.uid', '123');
};

const ctx = {
  config,
  options: {
    key: '123',
    secret: '456'
  }
};

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMjMiLCJzY29wZXMiOnsicnVsZXMiOnsiYWN0aW9ucyI6WyJyZWFkIiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIl19LCJjbGllbnRzIjp7ImFjdGlvbnMiOlsicmVhZCJdfSwiY29ubmVjdGlvbnMiOnsiYWN0aW9ucyI6WyJyZWFkIiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIl19fSwiaWF0IjoxNDY1MjI4MjMwMDM2LCJqdGkiOiIxMjMifQ.eoRqKaSDVX8K6BV5Oqx_DJDKSzQeNYyXqUtR-8FXZzg';

describe("generateJWT", () => {
  beforeEach(setConfig);

  // restore before next test run
  // avoids changing values for source control
  after(setConfig);

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
