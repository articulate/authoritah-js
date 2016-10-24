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

var _promisify = require('../utils/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

var _prepareRuleForSave = require('../transformers/rules/prepareRuleForSave');

var _prepareRuleForSave2 = _interopRequireDefault(_prepareRuleForSave);

var _prepareConnectionForSave = require('../transformers/connections/prepareConnectionForSave');

var _prepareConnectionForSave2 = _interopRequireDefault(_prepareConnectionForSave);

var _prepareClientForSave = require('../transformers/clients/prepareClientForSave');

var _prepareClientForSave2 = _interopRequireDefault(_prepareClientForSave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatter = _ramda2.default.ifElse(_ramda2.default.equals('json'), _ramda2.default.always(_ramda2.default.curry(JSON.stringify)(_ramda2.default.__, null, 2)), _ramda2.default.always(_ramda2.default.curry(_jsYaml2.default.dump)(_ramda2.default.__, { noRefs: true })));

var selectTypes = _ramda2.default.pick(['rules', 'connections', 'clients']);

var transformations = {
  rules: _ramda2.default.map(_prepareRuleForSave2.default),
  connections: _ramda2.default.map(_prepareConnectionForSave2.default),
  clients: _ramda2.default.map(_prepareClientForSave2.default)
};

function saveManifest(filename) {
  var writer = (0, _promisify2.default)(_ramda2.default.partial(_fs2.default.writeFile, [filename]));

  return function (context) {
    var format = context.options.format;

    return _ramda2.default.compose(writer, formatter(format), _ramda2.default.evolve(transformations), selectTypes)(context).then(context);
  };
}