'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveManifest;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropId = _ramda2.default.map(_ramda2.default.omit(["id"]));
var formatter = _ramda2.default.ifElse(_ramda2.default.equals('json'), _ramda2.default.always(_ramda2.default.curry(JSON.stringify)(_ramda2.default.__, null, 2)), _ramda2.default.always(_jsYaml2.default.dump));

function saveManifest(filename) {
  var writer = _ramda2.default.partial(_fs2.default.writeFileSync, [filename]);

  return function (context) {
    var rules = context.rules;
    var connections = context.connections;
    var format = context.options.format;


    return _ramda2.default.compose(writer, formatter(format), _ramda2.default.mergeAll)({
      rules: dropId(rules),
      connections: dropId(connections)
    });
  };
}
//# sourceMappingURL=saveManifest.js.map