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

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMjMiLCJzY29wZXMiOnsicnVsZXMiOnsiYWN0aW9ucyI6WyJyZWFkIiwidXBkYXRlIiwiZGVsZXRlIiwiY3JlYXRlIl19LCJjb25uZWN0aW9ucyI6eyJhY3Rpb25zIjpbInJlYWQiLCJ1cGRhdGUiXX19LCJpYXQiOjE0NjUyMjgyMzAwMzYsImp0aSI6IjEyMyJ9.jTRg4Iul4e2SqG0Dn1PILpMwrZ7vvsOLCZH188xgCag';

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
