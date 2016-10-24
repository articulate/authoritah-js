'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _loadEnv = require('../utils/loadEnv');

var _loadEnv2 = _interopRequireDefault(_loadEnv);

var _generateJWT = require('./generateJWT');

var _generateJWT2 = _interopRequireDefault(_generateJWT);

var _say2 = require('../utils/say');

var _say3 = _interopRequireDefault(_say2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(options) {
  var _say = (0, _say3.default)(options);

  var error = _say.error;
  var ok = _say.ok;


  return (0, _loadEnv2.default)(options).then(_generateJWT2.default).then(ok).catch(error);
}