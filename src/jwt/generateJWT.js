import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const allActions = {
  actions: [
    "read",
    "create",
    "update",
    "delete"
  ]
};

const DEFAULT_SCOPE = {
  rules: allActions,
  clients: allActions,
  connections: allActions,
};

export default function generateJWT(context) {
  const {
    config,
    options: {
      secret,
      key,
      refresh,
    }
  } = context;

  const apiKey = key || config.orGet('auth0.key', key);
  const apiSecret = secret || config.orGet('auth0.secret', secret);

  if(refresh) { config.remove('jwt.createdAt', 'jwt.uid'); }

  const createdAt = config.getset('jwt.createdAt', Date.now());
  const uid = config.getset('jwt.uid', crypto.randomBytes(16).toString('hex'));
  const decodedSecret = Buffer.from(apiSecret, 'base64');

  return jwt.sign({
    aud: apiKey,
    scopes: DEFAULT_SCOPE,
    iat: createdAt,
    jti: uid,
  }, decodedSecret);
}
