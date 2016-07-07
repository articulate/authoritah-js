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

var dropField = function dropField(field) {
  return _ramda2.default.map(_ramda2.default.omit([field]));
};
var formatter = _ramda2.default.ifElse(_ramda2.default.equals('json'), _ramda2.default.always(_ramda2.default.curry(JSON.stringify)(_ramda2.default.__, null, 2)), _ramda2.default.always(_ramda2.default.curry(_jsYaml2.default.dump)(_ramda2.default.__, { noRefs: true })));

var filterOptions = _ramda2.default.over(_ramda2.default.lensProp('options'), _ramda2.default.pick(["customScripts"]));
var selectTypes = _ramda2.default.pick(['rules', 'connections', 'clients']);

var transformations = {
  rules: dropField('id'),
  connections: _ramda2.default.compose(filterOptions, dropField('id')),
  clients: dropField('client_id')
};

function saveManifest(filename) {
  var writer = _ramda2.default.partial(_fs2.default.writeFileSync, [filename]);

  return function (context) {
    var format = context.options.format;

    return _ramda2.default.compose(writer, formatter(format), _ramda2.default.evolve(transformations), selectTypes)(context);
  };
}
//# sourceMappingURL=saveManifest.js.map