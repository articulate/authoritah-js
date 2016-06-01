import jwt from 'jsonwebtoken'

import randomHex from '../utils/randomHex'
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

function generateJWT(context) {
  const { key,
    secret,
    jid,
    created_at = Date.now()
  } = context;
  const decodedSecret = Buffer.from(secret, 'base64');

  return jwt.sign({
                    aud: key,
                    scopes: DEFAULT_SCOPE,
                    iat: created_at,
                    jti: jid,
                  }, decodedSecret);
}

export default function index(args) {
  return Promise.resolve(args)
    .then(randomHex('jid'))
    .then(generateJWT)
}

