'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _loadEnv = require('../utils/loadEnv');

var _loadEnv2 = _interopRequireDefault(_loadEnv);

var _say2 = require('../utils/say');

var _say3 = _interopRequireDefault(_say2);

var _generateJWT = require('../jwt/generateJWT');

var _generateJWT2 = _interopRequireDefault(_generateJWT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QUESTIONS = [{ type: 'input', name: "auth0.env", message: "Enter your Auth0 domain (leave off the 'auth0.com'):" }, { type: 'input', name: "auth0.key", message: "Auth0 key:" }, { type: 'password', name: "auth0.secret", message: "Auth0 secret:" }];

function saveAnswers(context) {
  var config = context.config;
  var answers = context.options.answers;


  config.sets(answers);
  return context;
}

function index(options) {
  var _say = (0, _say3.default)(options);

  var ok = _say.ok;
  var error = _say.error;


  _inquirer2.default.prompt(QUESTIONS).then(_ramda2.default.curry(_ramda2.default.assoc)('answers', _ramda2.default.__, options)).then(_loadEnv2.default).then(saveAnswers).then(_generateJWT2.default).then(function (jwt) {
    return ok('New JWT generated: ' + jwt);
  }).catch(error);
}
//# sourceMappingURL=index.js.map