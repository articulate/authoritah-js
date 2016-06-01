import jwt from 'jsonwebtoken'

import promisify from '../utils/promisify'

const DEFAULT_SCOPE = {
  rules: {
    actions: [
      "read",
      "update",
      "delete",
      "create"
    ]
  }
};

export default function generateJWT(context) {
  const { uid, created_at, key, secret } = context;
  const decodedSecret = Buffer.from(secret, 'base64');

  return jwt.sign({
                    aud: key,
                    scopes: DEFAULT_SCOPE,
                    iat: created_at,
                    jti: uid,
                  }, decodedSecret);
}
