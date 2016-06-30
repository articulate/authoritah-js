'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateJWT;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allActions = {
  actions: ["read", "create", "update", "delete"]
};

var DEFAULT_SCOPE = {
  rules: allActions,
  clients: allActions,
  connections: allActions
};

function generateJWT(context) {
  var config = context.config;
  var _context$options = context.options;
  var secret = _context$options.secret;
  var key = _context$options.key;
  var refresh = _context$options.refresh;


  var apiKey = key || config.orGet('auth0.key', key);
  var apiSecret = secret || config.orGet('auth0.secret', secret);

  if (refresh) {
    config.remove('jwt.createdAt', 'jwt.uid');
  }

  var createdAt = config.getset('jwt.createdAt', Date.now());
  var uid = config.getset('jwt.uid', _crypto2.default.randomBytes(16).toString('hex'));
  var decodedSecret = Buffer.from(apiSecret, 'base64');

  return _jsonwebtoken2.default.sign({
    aud: apiKey,
    scopes: DEFAULT_SCOPE,
    iat: createdAt,
    jti: uid
  }, decodedSecret);
}
//# sourceMappingURL=generateJWT.js.map