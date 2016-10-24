'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _loadScript = require('../../utils/loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connections require a bit of manipulation to work with the `loadScript` function expectations
var loadConnectionScripts = _ramda2.default.over(_ramda2.default.lensPath(['options', 'customScripts']), _ramda2.default.mapObjIndexed(function (_, key, object) {
  return (0, _loadScript2.default)(key, object)[key];
}));

var loadConnections = _ramda2.default.map(loadConnectionScripts);
exports.default = loadConnections;