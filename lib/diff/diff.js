'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareRuleForDiff = require('../transformers/rules/prepareRuleForDiff');

var _prepareRuleForDiff2 = _interopRequireDefault(_prepareRuleForDiff);

var _prepareConnectionForDiff = require('../transformers/connections/prepareConnectionForDiff');

var _prepareConnectionForDiff2 = _interopRequireDefault(_prepareConnectionForDiff);

var _additions = require('./detectors/additions');

var _additions2 = _interopRequireDefault(_additions);

var _removals = require('./detectors/removals');

var _removals2 = _interopRequireDefault(_removals);

var _changes = require('./detectors/changes');

var _changes2 = _interopRequireDefault(_changes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMPARE_FIELDS = {
  rules: _prepareRuleForDiff2.default,
  connections: _prepareConnectionForDiff2.default
};

function diff(field, context) {
  var local = context.manifest[field],
      server = context[field],
      ok = context.say.ok;

  var filter = COMPARE_FIELDS[field];

  var diff = {
    changes: (0, _changes2.default)(filter)(local, server),
    removes: (0, _removals2.default)(local, server),
    adds: (0, _additions2.default)(local, server)
  };

  if (_ramda2.default.all(_ramda2.default.isEmpty, _ramda2.default.values(diff))) {
    ok('No changes to apply for ' + field + '!');
  }
  return _ramda2.default.assocPath(['diff', field], diff, context);
}

exports.default = _ramda2.default.curry(diff);