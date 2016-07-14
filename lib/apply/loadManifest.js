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

var _loadConnections = require('../transformers/connections/loadConnections');

var _loadConnections2 = _interopRequireDefault(_loadConnections);

var _loadRules = require('../transformers/rules/loadRules');

var _loadRules2 = _interopRequireDefault(_loadRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformations = {
  rules: _loadRules2.default,
  connections: _loadConnections2.default
};

function loadManifest(filename) {
  var parser = filename.endsWith("json") ? JSON.parse : _jsYaml2.default.load;
  var manifest = _ramda2.default.compose(parser, _fs2.default.readFileSync)(filename);

  return _ramda2.default.assoc('manifest', _ramda2.default.evolve(transformations, manifest));
}
//# sourceMappingURL=loadManifest.js.map