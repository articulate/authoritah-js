'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadManifest;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _loadScript = require('../utils/loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connections require a bit of manipulation to work with the `loadScript` function expectations
var loadConnectionScripts = _ramda2.default.over(_ramda2.default.lensPath(['options', 'customScripts']), _ramda2.default.mapObjIndexed(function (_, key, object) {
  return (0, _loadScript2.default)(key, object)[key];
}));

var transformations = {
  rules: _ramda2.default.map((0, _loadScript2.default)('script')),
  connections: _ramda2.default.map(loadConnectionScripts)
};

function loadManifest(filename) {
  var parser = filename.endsWith("json") ? JSON.parse : _jsYaml2.default.load;
  var manifest = _ramda2.default.compose(parser, _fs2.default.readFileSync)(filename);

  return _ramda2.default.assoc('manifest', _ramda2.default.evolve(transformations, manifest));
}
//# sourceMappingURL=loadManifest.js.map