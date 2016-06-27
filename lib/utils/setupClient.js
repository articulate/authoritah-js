'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context) {
  var config = context.config;
  var env = context.options.env;
  var error = context.say.error;

  var token = (0, _generateJWT2.default)(context);
  var auth0Domain = config.orGet('auth0.env', env);

  if (!auth0Domain) {
    error("Auth0 environment required. Use the --env flag or set in the config file.");
    process.exit(1);
  }

  var client = new ManagementClient({ token: token, domain: auth0Domain + '.auth0.com' });
  return (0, _ramda.assoc)('client', client, context);
};

var _auth = require('auth0');

var _auth2 = _interopRequireDefault(_auth);

var _ramda = require('ramda');

var _generateJWT = require('../jwt/generateJWT');

var _generateJWT2 = _interopRequireDefault(_generateJWT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManagementClient = _auth2.default.ManagementClient;
//# sourceMappingURL=setupClient.js.map