'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = versionParser;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _promisify = require('./promisify');

var _promisify2 = _interopRequireDefault(_promisify);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function versionParser() {
  return (0, _promisify2.default)(_fs2.default.readFile)(__dirname + '/../../package.json').then(JSON.parse).then((0, _ramda.path)(['version']));
}
//# sourceMappingURL=versionParser.js.map