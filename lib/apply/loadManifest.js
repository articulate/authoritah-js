'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadManifest;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadScript(rule) {
  var script_file = rule.script_file;

  var script = _fs2.default.readFileSync(script_file).toString();

  return (0, _ramda.compose)((0, _ramda.assoc)('script', script), (0, _ramda.dissoc)('script_file'))(rule);
}

function loadManifest(filename) {
  var parser = filename.endsWith("json") ? JSON.parse : _jsYaml2.default.load;
  var manifest = (0, _ramda.compose)(parser, _fs2.default.readFileSync)(filename);

  return function (context) {
    return (0, _ramda.assoc)('manifest', (0, _ramda.map)(loadScript, manifest), context);
  };
}
//# sourceMappingURL=loadManifest.js.map